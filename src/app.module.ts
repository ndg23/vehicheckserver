import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ControlModule } from './control/control.module';
import { IncidentModule } from './incident/incident.module';
import { VerbalisationModule } from './verbalisation/verbalisation.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [UserModule, VehicleModule, ControlModule, IncidentModule, VerbalisationModule, AuthModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
