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
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyService } from './currency.service';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Se han obtenido los usuarios exitosamente',
  })
  create(@Body() createUserDto: CreateCurrencyDto) {
    return this.currencyService.create(createUserDto);
  }

  @Get()
  findAll() {
     return this.currencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateCurrencyDto) {
    return this.currencyService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
