import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule'
import { BlacklistCleanupService } from "../jwt/blacklist/cleanup.blacklist.service";

@Injectable()
export class ScheduleTaskService {
    constructor(private blacklistCleanupService: BlacklistCleanupService) {}

    @Cron('16 17 * * *')
    cleanBlacklistAtMinight(){
        this.blacklistCleanupService.cleanBlacklist();
    }
}