import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    
    private readonly jwtService:JwtService 
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const validate = await this.validateEmail(createUserDto.email)
    console.log('validate:', validate)
    if(validate){
      throw new HttpException({msg:'El correo ya se encuentra registrado'}, HttpStatus.FOUND)
    }
    const saltOrRounds = 10;
    const password = 'random_password';
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash
    console.log('Insert user:', createUserDto)
    return this.userModel.create(createUserDto).then(
          (user)=>{
            return user
          }
        ).catch(
          (error)=>{
            throw new HttpException({msg:'Ocurrio un error al insertar', error}, HttpStatus.BAD_REQUEST)
          }
        );
  }
  
  async login(loginUserDto:LoginUserDto){
    const isEmail = await this.validateEmail(loginUserDto.email)
    if (!isEmail){
      throw new HttpException({msg: 'Correo invalido'},HttpStatus.UNAUTHORIZED)
    }
    console.log('Si consegui el correo')
    const user = isEmail 
    let pass = await bcrypt.compare(loginUserDto.password, user.password);
    console.log('RESULTADO DEL VALIDADOR DE CONTRASEÑA:', pass)
    if(!pass){
      throw new HttpException({msg:'Contraseña invalida'}, HttpStatus.UNAUTHORIZED)
    }
    let payload = {
      name: user.name,
      email: user.email,
    }
    const session = await this.jwtService.signAsync({payload})
    return session
  }

  private  validateEmail(email:string): Promise<User | null>{
    return this.userModel.findOne({ where: { email } })
  }

  findAll() {
    return this.userModel.findAll().catch(
      (error)=>{
        console.log(error)
      }
    ) //`This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return {msg:'Usuario eliminado con exito!'}
    }
  }
}
