import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { ChatService } from "./chat.service";

import { PrismaService } from "../prisma.service";

@WebSocketGateway(3002, { cors: { origin: "http://localhost:8081" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private chatService: ChatService,
    private prisma: PrismaService
  ) { }

  private activeUsers: Record<string, { id: string; role: string }> = {};

  async handleConnection(client: Socket) {
    console.log("User connected, waiting for authentication:", client.id);
  }

  async handleDisconnect(client: Socket) {
    const user = this.activeUsers[client.id];
    if (user) {
      this.server.to(user.role === 'Teacher' ? 'broadcastTeachers' : 'broadcastStudents').emit('user-left', {
        message: `${user.id} has left the chat`,
        username: user.id,
      });

      await this.chatService.removeUserFromAllRooms(client.id);
      delete this.activeUsers[client.id];
    }
    console.log("Client with id " + client.id + " has disconnected.");
  }

  @SubscribeMessage("joinChat")
  async handleJoinChat(@MessageBody() data: { roomName: string; user: { id: string; name: string; role: string; socketId: string } }) {
    console.log(`User ${data.user.name} joining room: ${data.roomName}`);

    this.server.sockets.sockets.get(data.user.socketId)?.join(data.roomName);

    this.activeUsers[data.user.socketId] = { id: data.user.id, role: data.user.role };

    this.server.to(data.roomName).emit('user-joined', {
      message: `${data.user.name} has joined the chat`,
      username: data.user.name,
    });
  }

  @SubscribeMessage("newMessage")
  async handleNewMessage(@MessageBody() message: { username: string; text: string }) {
  console.log("Broadcast csatornában új üzenet: " + message.text, message.username);

  try {
    const nameParts = message.username.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const user = await this.prisma.user.findFirst({
      where: {
        AND: [
          { firstName: firstName },
          { lastName: lastName },
        ],
      },
      select: {
        role: true,
      },
    });

    if (user) {
      console.log("User found: ", user);
      console.log("User role: ", user.role);

      if (user.role === 'Teacher') {
        console.log("Sending message to Teacher broadcast");
        this.server.to('broadcastTeachers').emit("message", message);
      } else if (user.role === 'Student') {
        console.log("Sending message to Student broadcast");
        this.server.to('broadcastStudents').emit("message", message);
      }
    } else {
      console.log("User not found with the given name");
    }
  } catch (error) {
    console.error("Error finding user: ", error);
  }
}

}
