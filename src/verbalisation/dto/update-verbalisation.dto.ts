import { PartialType } from '@nestjs/mapped-types';
import { CreateVerbalisationDto } from './create-verbalisation.dto';

export class UpdateVerbalisationDto extends PartialType(CreateVerbalisationDto) {}
