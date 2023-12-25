import { Module } from '@nestjs/common';
import { VerbalisationService } from './verbalisation.service';
import { VerbalisationController } from './verbalisation.controller';

@Module({
  controllers: [VerbalisationController],
  providers: [VerbalisationService],
})
export class VerbalisationModule {}
