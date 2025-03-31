import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { ChatService } from "./chat.service";
import { User } from "./interfaces/chat.interface";

@WebSocketGateway(3002, { cors: { origin: "http://localhost:8081" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private chatService: ChatService) {}

  private activeUsers: Record<string, string> = {};

  async handleConnection(client: Socket) {
    console.log("User connected, waiting for authentication:", client.id);
  }

  async handleDisconnect(client: Socket) {
    await this.chatService.removeUserFromAllRooms(client.id)
    console.log("Client with id " + client.id + " has disconnected.")
    
  }

  @SubscribeMessage("joinChat")
  async handleUserJoin(
    @MessageBody()
    payload: {
      roomName: string
      user: User
    }
  ) {
    if (payload.user.socketId) {
      console.log(`${payload.user.socketId} is joining ${payload.roomName}`)
      await this.server.in(payload.user.socketId).socketsJoin(payload.roomName)
      await this.chatService.addUserToRoom(payload.roomName, payload.user)
    }
  }

  @SubscribeMessage("newMessage")
  handleNewMessage(@MessageBody() message: { username: string; text: string }) {
    this.server.emit("message", message);
  }
}
