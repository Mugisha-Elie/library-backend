import { Module } from '@nestjs/common'
import { CategoryModule } from './application/category/category.module'
import { PersistenceModule } from './persistence'

@Module({
  imports: [CategoryModule, PersistenceModule],
  controllers: [],
  providers: []
})
export class AppModule {}