import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenBlacklistService {
    private readonly blacklist: string[] = []
    
    addToBlacklist(token: string) {
        this.blacklist.push(token)
    }

    isTokenBlacklisted(token: string) {
        return this.blacklist.includes(token)
    }

    cleanBlacklist(){
        const clean = this.blacklist.forEach(() => {
            this.blacklist.shift()
        })
        console.log(clean)
        return clean
    }
}