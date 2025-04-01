import { Controller, Get, Param } from '@nestjs/common'
import { Room } from './interfaces/chat.interface'
import { ChatService } from './chat.service'

@Controller()
export class UserController {
  constructor(private chatService: ChatService) {}

  @Get('/rooms')
  async getAllRooms(): Promise<Room[]> {
    return await this.chatService.getRooms()
  }

  @Get('/rooms/:room')
  async getRoom(@Param() params): Promise<Room> {
    const rooms = await this.chatService.getRooms()
    const room = await this.chatService.getRoomByName(params.room)
    return rooms[room]
  }
}
