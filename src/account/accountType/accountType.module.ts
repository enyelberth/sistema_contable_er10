import { Module } from '@nestjs/common';
import { AccountTypeController } from './accountType.controller';
import { AccountTypeService } from './accountType.service';
@Module({
  // imports:[],
  controllers: [AccountTypeController],
  providers: [AccountTypeService],
})
export class CurrencyModule {}
