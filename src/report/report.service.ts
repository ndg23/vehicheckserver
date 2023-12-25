import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportEntry } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntry)
    private readonly reportRepository: Repository<ReportEntry>,
  ) { }

  async create(createReportDto: CreateReportDto): Promise<ReportEntry> {
    const newReport = this.reportRepository.create(createReportDto);
    return await this.reportRepository.save(newReport);
  }

  async findAll(): Promise<ReportEntry[]> {
    return await this.reportRepository.find();
  }

  async findOne(id: number): Promise<ReportEntry> {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<ReportEntry> {
    const existingReport = await this.reportRepository.findOne({ where: { id } });

    if (!existingReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    // Update properties based on the DTO
    Object.assign(existingReport, updateReportDto);

    return await this.reportRepository.save(existingReport);
  }

  async remove(id: number): Promise<void> {
    const existingReport = await this.reportRepository.findOne({ where: { id } });

    if (!existingReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    await this.reportRepository.remove(existingReport);
  }
}
