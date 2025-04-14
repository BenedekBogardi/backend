import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
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
      this.server
        .to(user.role === "Teacher" ? "broadcastTeachers" : "broadcastStudents")
        .emit("user-left", {
          message: `${user.id} has left the chat`,
          username: user.id,
        });

      await this.chatService.removeUserFromAllRooms(client.id);
      delete this.activeUsers[client.id];
    }
    console.log("Client with id " + client.id + " has disconnected.");
  }

  @SubscribeMessage("joinChat")
  async handleJoinChat(
    @MessageBody()
    data: {
      roomName: string;
      user: { id: string; name: string; role: string; socketId: string };
    }
  ) {
    console.log(`User ${data.user.name} joining room: ${data.roomName}`);

    this.server.sockets.sockets.get(data.user.socketId)?.join(data.roomName);

    this.activeUsers[data.user.socketId] = {
      id: data.user.id,
      role: data.user.role,
    };

    this.server.to(data.roomName).emit("user-joined", {
      message: `${data.user.name} has joined the chat`,
      username: data.user.name,
    });
  }

  @SubscribeMessage("newMessage")
async handleNewMessage(
  @MessageBody() message: { username: string; text: string; roomName: string },
  @ConnectedSocket() client: Socket
) {
  console.log("New message:", message.text, "from:", message.username); // Log here

  try {
    const nameParts = message.username.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const user = await this.prisma.user.findFirst({
      where: {
        AND: [{ firstName: firstName }, { lastName: lastName }],
      },
      select: {
        role: true,
      },
    });

    if (user) {
      console.log("User found:", user.role);
      this.server.to(message.roomName).emit("message", {
        text: message.text,
        username: message.username,
        socketId: client.id,
      });
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}




  @SubscribeMessage("joinPrivateRoom")
  async handleJoinPrivateRoom(
    @MessageBody()
    data: {
      roomName: string;
      user: { id: string; name: string; role: string; socketId: string };
    }
  ) {
    const { roomName, user } = data;
    const clientSocket = this.server.sockets.sockets.get(user.socketId);
    if (!clientSocket) {
      console.warn("Client socket not found for joinPrivateRoom");
      return;
    }
    console.log(`${user.name} joining private room: ${roomName}`);
    clientSocket.join(roomName);
    this.activeUsers[user.socketId] = { id: user.id, role: user.role };

    this.server.to(roomName).emit("user-joined", {
      message: `${user.name} has joined the private chat`,
      username: user.name,
    });
  }


  @SubscribeMessage("privateMessage")
  async handlePrivateMessage(
    @MessageBody()
    message: { roomName: string; username: string; text: string }
  ) {
    console.log(
      `Private message in ${message.roomName} from ${message.username}: ${message.text}`
    );

    this.server.to(message.roomName).emit("privateMessage", {
      username: message.username,
      text: message.text,
    });
  }
}