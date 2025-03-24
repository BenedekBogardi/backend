import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway(3002, { cors: { origin: "http://localhost:8081" } })
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private activeUsers: Record<string, string> = {};

  handleConnection(client: Socket) {
    console.log("User connected, waiting for authentication:", client.id);
  }

  handleDisconnect(client: Socket) {
    const username = this.activeUsers[client.id];
    if (username) {
      console.log(`${username} disconnected`);
      this.server.emit("user-left", { message: `${username} has left the chat.` });
      delete this.activeUsers[client.id];
    }
  }

  @SubscribeMessage("joinChat")
  handleJoinChat(client: Socket, username: string) {
    this.activeUsers[client.id] = username;
    console.log(`${username} joined the chat`);
    this.server.emit("user-joined", { message: `${username} has joined the chat!` });
  }

  @SubscribeMessage("newMessage")
  handleNewMessage(@MessageBody() message: { username: string; text: string }) {
    this.server.emit("message", message);
  }
}
