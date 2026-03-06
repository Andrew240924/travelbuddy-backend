import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedRoute } from './saved-route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedRoute])],
  // controllers: [SavedRoutesController],
  // providers: [SavedRoutesService],
})
export class SavedRoutesModule {}
