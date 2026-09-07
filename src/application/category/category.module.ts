import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "../../persistence";
import { ICategoryService } from "./category.service.interface";
import { ICategoryRepository } from "./category.repository.interface";

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: ICategoryRepository, 
      useClass: CategoryRepository
    },
    {
      provide: ICategoryService,
      useClass: CategoryService
    },
  ],
  exports: [ICategoryService, ICategoryRepository]
})
export class CategoryModule {}