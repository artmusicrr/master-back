import { Module } from '@nestjs/common';
import { TitlesService } from './titles.service';
import { TitleController } from './titles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TitleRepository } from './entities/text.entities';

@Module({
  providers: [TitlesService, TitleRepository],
  controllers: [TitleController],
  imports: [DatabaseModule],
  exports: [TitlesService],
})
export class TitlesModule {}
