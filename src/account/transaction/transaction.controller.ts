import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
@ApiTags('Transaction')
@Controller('users')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Transaccion realizada exitosamente',
  })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }
  @Get()
  async findAll() {
    const transaction = await this.transactionService.findAll();
    return {
      status: 200,
      data: transaction,
    };
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return '' + id;
  }
}
