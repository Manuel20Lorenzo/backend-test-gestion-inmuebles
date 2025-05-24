import { Module } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { InmuebleController } from './inmueble.controller';

@Module({
  controllers: [InmuebleController],
  providers: [InmuebleService],
})
export class InmuebleModule {}
