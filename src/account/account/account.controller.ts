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
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
  
  @ApiTags('Account')
  @Controller('account')
  export class AccountController {
    constructor(private readonly accountService: AccountService) {}
    @Post()
    @ApiResponse({
      status: 200,
      description: 'Se han obtenido los usuarios exitosamente',
    })
    create(@Body() createUserDto: CreateAccountDto) {
      return this.accountService.create(createUserDto);
    }
  
    @Get()
    findAll() {
       return this.accountService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.accountService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: CreateAccountDto) {
      return this.accountService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.accountService.remove(+id);
    }
  }
  