import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { InmuebleModule } from './inmueble/inmueble.module';
import { User } from './users/model/user.model';
import { House } from './inmueble/model/inmueble.model';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({

  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,//Esto puede estar en el .ENV
      signOptions: { expiresIn: '8h' },//Puede estar en el .ENV
    }),
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST, //'localhost',        // Cambia si es otro host
      port: +process.env.DB_PORT, //5432,               // Puerto por defecto PostgreSQL
      username: process.env.DB_USER, //'myuser',       // Tu usuario de BD
      password:process.env.DB_PASS, //'mypassword',   // Tu contraseña
      database: process.env.DB_NAME,// 'mydatabase',   // Tu base de datos
      autoLoadModels: true,     // Auto carga modelos importados
      synchronize: true,        // Sincroniza tablas (en dev)
      models: [User, House],               // Aquí puedes añadir tus modelos
    }),
    InmuebleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
