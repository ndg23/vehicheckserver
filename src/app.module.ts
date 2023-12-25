import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import typeorm from './db';

@Module({
  imports: [
    UserModule
    , VehicleModule
    , TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [typeorm] 
    }),
    ]
  ,
  controllers: [AppController]
  ,
  providers: [AppService]
  ,
})
export class AppModule {}
