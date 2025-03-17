/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Socket, Server} from 'socket.io'

@WebSocketGateway(3002, {})
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        //amikor egy új user "csatlakozik", frissíti a socket-et, hogy érzékelje őt is
        console.log('New user connected', client.id)

        this.server.emit('user-joined', {
            message: 'New user just joined! ID:' + client.id
        })
    }

    handleDisconnect(client: Socket) {
        console.log('User disconnected with ID:', client.id)

        this.server.emit('user-left', {
            message: 'User ' + client.id + " has left the chat."
        })
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(@MessageBody() message: string){
        console.log();
        this.server.emit('message', message)//broadcast üzenet
    }
}

//client.emit('reply', 'This is a reply')