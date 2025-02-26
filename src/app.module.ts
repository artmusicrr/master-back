import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
//import { UserController } from './user/user.controller';
//import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TitlesModule } from './titles/titles.module';
import { ImageModule } from './image/image.module';
import { SliderModule } from './slider/slider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TitlesModule,
    ImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Servir a pasta de uploads
      serveRoot: '/uploads', // URL pública para acessar as imagens
    }),
    SliderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
