import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountTypeService } from './accountType.service';
import { CreateaccountTypeDto } from './dto/create-accountType.dto';
  
  @ApiTags('AccountType')
  @Controller('accountType')
  export class AccountTypeController {
    constructor(private readonly accountTypeService: AccountTypeService) {}
    @Post()
    @ApiResponse({
      status: 200,
      description: 'Se han obtenido los usuarios exitosamente',
    })
    create(@Body() createUserDto: CreateaccountTypeDto) {
      return this.accountTypeService.create(createUserDto);
    }
  
    @Get()
    findAll() {
       return this.accountTypeService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.accountTypeService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: CreateaccountTypeDto) {
      return this.accountTypeService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.accountTypeService.remove(+id);
    }
}
  