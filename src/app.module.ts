import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports: [
    JwtModule.register({
      global: true,
      secret: 'example',//Esto puede estar en el .ENV
      signOptions: { expiresIn: '8h' },//Puede estar en el .ENV
    }),
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',        // Cambia si es otro host
      port: 5432,               // Puerto por defecto PostgreSQL
      username: 'myuser',       // Tu usuario de BD
      password: 'mypassword',   // Tu contraseña
      database: 'mydatabase',   // Tu base de datos
      autoLoadModels: true,     // Auto carga modelos importados
      synchronize: true,        // Sincroniza tablas (en dev)
      models: [],               // Aquí puedes añadir tus modelos
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
