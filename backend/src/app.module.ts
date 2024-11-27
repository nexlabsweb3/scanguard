import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { getEnvPath } from './common/utils/getEnvPath';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      isGlobal: true,
    }),
    ProductModule,
    ManufacturerModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
