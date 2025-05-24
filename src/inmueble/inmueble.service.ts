import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { House } from './model/inmueble.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/model/user.model';

@Injectable()
export class InmuebleService {
  constructor(
    @InjectModel(House)
    private houseModel: typeof House,  
  ) {}

  create(createInmuebleDto: CreateInmuebleDto) {
    return this.houseModel.create(createInmuebleDto).then(
      (house)=>{
        return house
      }
    ).catch(
      (error)=>{
        console.log('error:',error)
        throw new HttpException({msg: 'Ocurrio un error al crear',error}, HttpStatus.BAD_REQUEST)
      }
    )
  }

  findAll() {
    return this.houseModel.findAll({
      include: [{ model: User, as: 'seller', attributes: ['id', 'name'] }]
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} inmueble`;
  }

  update(id: number, updateInmuebleDto: UpdateInmuebleDto) {
    return `This action updates a #${id} inmueble`;
  }

  async remove(id: number) {
    const house = await House.findByPk(id);
    if (house) {
      await house.destroy();
      return {msg:'Inmueble eliminado con exito!'}
    };
  }
}
