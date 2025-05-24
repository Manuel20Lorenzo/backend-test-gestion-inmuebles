import { Module } from '@nestjs/common';
import { InmuebleService } from './inmueble.service';
import { InmuebleController } from './inmueble.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { House } from './model/inmueble.model';

@Module({
  imports:[
    SequelizeModule.forFeature([House])
  ],
  controllers: [InmuebleController],
  providers: [InmuebleService],
})
export class InmuebleModule {}
