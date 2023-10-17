import {Request} from "express"
import { Session } from "express-session";
import { Socket } from "socket.io";

export interface UserInterface {
    idUser?  : string
    name     : string 
    email    : string 
    password : string
    friendId? : string
}

export interface ExtendedSessionData extends Session {
    // user: User
    user: any
    // dashboard: any
  }

export interface CustomRequest extends Request {
    session: ExtendedSessionData;
}

export interface CustomSocket extends Socket {
    session: ExtendedSessionData
}
