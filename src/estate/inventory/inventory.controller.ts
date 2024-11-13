import { InventoryService } from "./inventory.service";
import { AuthJwtService } from "../../auth/jwt/jwt.service";
import { Query, Request } from "@nestjs/common";
import { ExceptionsMessages } from "../../exceptions/messages/exceptions.messages";
import { tableSchema } from "src/schema/extras.schema";

export class InventoryController {
  constructor(
    private readonly modulesService: InventoryService,
    private readonly AuthJwtService: AuthJwtService
  ) {}

  async getInventory(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
    @Request() req: any
  ) {
    try {

        const parsePage = parseInt(page);
        tableSchema.parse({
            searchOptions,
            limit,
            page:parsePage,
        });
        


        // return this.modulesService.getInventory(
        //     searchOptions,
        //     ,
        //     parsePage,
        // );



    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  async getInventorys(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
    @Request() req: any
  ) {
    try {
        
    } catch (error) {
        ExceptionsMessages.schemaError("info",error.message);
    }
  }
}
