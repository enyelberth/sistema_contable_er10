import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { AccessLevel } from "../../system/access-level/entities/access-level.entity";
import { AccessLevelService } from "src/system/access-level/access-level.service";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { Inventory } from "./entities/inventory.entity";
import { SubGroup } from "../subgroup/entities/subgroup.entity";

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private AccessLevel: AccessLevelService
  ) {}
  async getInventorys(searchOptions:string, limit:number, page:number) {
    
  }
  async getInventory(searchOptions:string, limit:number, page:number) {}
  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.inventoryRepository.query(`
        
        `);
  }
  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.inventoryRepository.query(`
            
        `);
  }
}
