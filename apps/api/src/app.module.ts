import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [DatabaseModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
