import { Injectable } from '@nestjs/common';
import { Room, User, Message } from './interfaces/chat.interface';

@Injectable()
export class ChatService {
  private rooms: Room[] = [];

  async addRoom(roomName: string, host: User): Promise<void> {
    const room = await this.getRoomByName(roomName);
    if (room === -1) {
      this.rooms.push({ name: roomName, host, users: [host], messages: [] });
    }
  }

  /*async getRoom(teacherId: string, studentId: string): Promise<Room> {
    let room = await this.roomRepository.findOne({
        where: { teacher: { id: teacherId }, student: { id: studentId } },
    });

    if (!room) {
        room = this.roomRepository.create({ teacher: { id: teacherId }, student: { id: studentId }, lastMessage: '' });
        await this.roomRepository.save(room);
    }

    return room;
  }*/

  async removeRoom(roomName: string): Promise<void> {
    this.rooms = this.rooms.filter((room) => room.name !== roomName);
  }

  async getRoomHost(roomName: string): Promise<User | null> {
    const roomIndex = await this.getRoomByName(roomName);
    return roomIndex !== -1 ? this.rooms[roomIndex].host : null;
  }

  async getRoomByName(roomName: string): Promise<number> {
    return this.rooms.findIndex((room) => room.name === roomName);
  }

  async addUserToRoom(roomName: string, user: User): Promise<void> {
    const roomIndex = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
      this.rooms[roomIndex].users.push(user);
      if (this.rooms[roomIndex].host.userId === user.userId) {
        this.rooms[roomIndex].host.socketId = user.socketId;
      }
    } else {
      await this.addRoom(roomName, user);
    }
  }

  async addMessageToRoom(roomName: string, message: Message): Promise<void> {
    const roomIndex = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
      this.rooms[roomIndex].messages.push(message);
    }
  }

  async getLastMessageByRoom(roomName: string): Promise<Message | null> {
    const roomIndex = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
      const messages = this.rooms[roomIndex].messages;
      return messages.length > 0 ? messages[messages.length - 1] : null;
    }
    return null;
  }

  async getMessagesByRoom(roomName: string): Promise<Message[]> {
    const roomIndex = await this.getRoomByName(roomName);
    return roomIndex !== -1 ? this.rooms[roomIndex].messages : [];
  }

  async findRoomsByUserSocketId(socketId: string): Promise<Room[]> {
    return this.rooms.filter((room) => room.users.some((user) => user.socketId === socketId));
  }

  async removeUserFromAllRooms(socketId: string): Promise<void> {
    const rooms = await this.findRoomsByUserSocketId(socketId);
    for (const room of rooms) {
      await this.removeUserFromRoom(socketId, room.name);
    }
  }

  async removeUserFromRoom(socketId: string, roomName: string): Promise<void> {
    const roomIndex = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
      this.rooms[roomIndex].users = this.rooms[roomIndex].users.filter((user) => user.socketId !== socketId);
      if (this.rooms[roomIndex].users.length === 0) {
        await this.removeRoom(roomName);
      }
    }
  }

  /*
  async getRoomForStudent(teacherId: string, studentId: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { teacherId, studentId } });
    if (!room) {
      const newRoom = this.roomRepository.create({ teacherId, studentId });
      await this.roomRepository.save(newRoom);
      return newRoom;
    }
    return room;
  }*/


  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }
}
