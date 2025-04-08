export interface User {
    userId: string
    userName: string
    socketId: string
    role: 'Student' | 'Teacher'
    profileId: number
  }
  
  export interface Room {
    name: string
    host: User
    users: User[]
    messages: Message[]
  }
  
  export interface Message {
    user: User
    timeSent: string
    message: string
    roomName: string
  }
  
  export interface ServerToClientEvents {
    chat: (e: Message) => void
  }
  
  export interface ClientToServerEvents {
    chat: (e: Message) => void
    join_room: (e: { user: User; roomName: string }) => void
  }
  