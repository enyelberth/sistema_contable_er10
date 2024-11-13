import { Injectable } from "@nestjs/common";
import { TokenBlacklistService } from "./token.blacklist.service";

@Injectable()
export class BlacklistCleanupService {
    constructor(private tokenBlacklistService: TokenBlacklistService) {}

    async cleanBlacklist() {
        this.tokenBlacklistService.cleanBlacklist();
    }
}