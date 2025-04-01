export interface User {
    userId: number
    userName: string
    socketId: string
    role: 'student' | 'teacher'
    profileId: number
  }
  
  export interface Room {
    name: string
    host: User
    users: User[]
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
  