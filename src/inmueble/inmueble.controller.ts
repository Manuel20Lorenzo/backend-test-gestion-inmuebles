import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';

@Controller('houses')
export class InmuebleController {
  constructor(private readonly inmuebleService: InmuebleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInmuebleDto: CreateInmuebleDto) {
    return this.inmuebleService.create(createInmuebleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.inmuebleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inmuebleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInmuebleDto: UpdateInmuebleDto) {
    return this.inmuebleService.update(+id, updateInmuebleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inmuebleService.remove(+id);
  }
}
