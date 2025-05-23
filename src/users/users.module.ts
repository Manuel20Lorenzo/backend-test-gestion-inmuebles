import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserMiddleware } from 'src/common/middleware/user.middleware';

@Module({
  imports:[
    SequelizeModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(UserMiddleware).forRoutes({
        path: 'users/validate',      // o '/users'
        method: RequestMethod.GET,
      })
  }
}
