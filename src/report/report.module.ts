import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportEntry } from './entities/report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntry])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
