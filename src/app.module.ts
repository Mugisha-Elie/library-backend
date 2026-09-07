import { Module } from '@nestjs/common'
import { CategoryModule } from './application/category/category.module'
import { UserModule } from './application/user'
import { PersistenceModule } from './persistence'

@Module({
  imports: [CategoryModule, PersistenceModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}