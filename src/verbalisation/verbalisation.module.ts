import { Module } from '@nestjs/common';
import { VerbalisationService } from './verbalisation.service';
import { VerbalisationController } from './verbalisation.controller';
import { Verbalisation } from './entities/verbalisation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Verbalisation])],
  controllers: [VerbalisationController],
  providers: [VerbalisationService],
})
export class VerbalisationModule {}
