



export class CurrencyController {
  @Post()
  create() {
    return "gholas";
  }
  @Get()
  findAll() {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return ""+id
  }
}