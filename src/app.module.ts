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
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './db';

@Module({
  imports: [UserModule
    , VehicleModule
    , ControlModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [typeorm] 
    }),
    
    , IncidentModule
    , VerbalisationModule
    , AuthModule
    , ReportModule]
  ,
  controllers: [AppController]
  ,
  providers: [AppService]
  ,
})
export class AppModule {}
