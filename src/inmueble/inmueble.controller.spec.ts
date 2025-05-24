import { Test, TestingModule } from '@nestjs/testing';
import { InmuebleController } from './inmueble.controller';
import { InmuebleService } from './inmueble.service';

describe('InmuebleController', () => {
  let controller: InmuebleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InmuebleController],
      providers: [InmuebleService],
    }).compile();

    controller = module.get<InmuebleController>(InmuebleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
