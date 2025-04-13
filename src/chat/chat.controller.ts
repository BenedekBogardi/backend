import { Controller, Get, Param } from '@nestjs/common';
import { Room } from './interfaces/chat.interface';
import { ChatService } from './chat.service';

@Controller()
export class UserController {
  constructor(private chatService: ChatService) {}

  @Get('/rooms')
  async getAllRooms(): Promise<Room[]> {
    return await this.chatService.getRooms();
  }

  @Get('/rooms/:room')
  async getRoom(@Param('room') roomName: string): Promise<{ lastMessage?: string }> {
    const room = await this.chatService.getRoomByName(roomName);
    if (!room) {
      return null;
    }

    const lastMessage = await this.chatService.getLastMessageByRoom(roomName);

    return {
      lastMessage: lastMessage ? lastMessage.message : 'Nincs üzenet',
    };
  }
}
