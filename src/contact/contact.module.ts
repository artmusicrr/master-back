import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule // Since ConfigModule.forRoot({ isGlobal: true }) is in AppModule, we just need to import ConfigModule here
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}