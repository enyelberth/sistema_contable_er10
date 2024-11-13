// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { Request, Response } from "express";
// import { TokenBlacklistService } from "../jwt/blacklist/token.blacklist.service";
// import { Socket } from "socket.io";

// @Injectable()
// export class InactivityMiddleware implements NestMiddleware {
//     constructor(private readonly tokenBlacklistService: TokenBlacklistService) {}

//     async use(req: Request, res: Response, next: Function) {
//         const token = req.headers.authorization.split(' ')[1]
//         const inactivityTimeout = 30 * 60 * 1000
//         let logoutTime = new Date().getTime() + inactivityTimeout

//         const io = Socket
//         io.on('connection', (socket) => {
//         socket.emit('sessionExpiry', { message: 'SU SESION ESTA POR EXPIRAR POR INACTIVIDAD' });

//         socket.on('userActivity', () => {
//             logoutTime = new Date().getTime() + inactivityTimeout;
//         })

//         const checkInactivity = setInterval(async () => {
//             if(new Date().getTime() >= logoutTime) {
//                 const isTokenBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(token)
//                 if(!isTokenBlacklisted) {
//                     await this.tokenBlacklistService.addToBlacklist(token)
//                     console.log('SESION CERRADA POR INACTIVIDAD')
//                 }
//                 clearInterval(checkInactivity)
//             }
//         }, 1000)
//         next();
//     },
//     }
// }

