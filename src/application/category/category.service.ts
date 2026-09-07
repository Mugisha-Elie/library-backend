import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { IDatabaseConnection } from "../../persistence";
import { Category } from "./category.model";
import { ICategoryRepository } from "./category.repository.interface";
import { ICategoryService } from "./category.service.interface";

@Injectable()
export class CategoryService extends ICategoryService {
  constructor(
    private readonly databaseConnection: IDatabaseConnection,
    private readonly categoryRepository: ICategoryRepository
  ){
    super() 
  }

  async createCategory(name: string): Promise<Category> {
    const trimmedName = name.trim()

    return this.databaseConnection.transactional(async tx => {
      const existing = await this.categoryRepository.findByName(tx, trimmedName)
      if (existing) {
        throw new ConflictException(
          `Category with name "${trimmedName}" already exists`,
        )
      }

      return this.categoryRepository.insert(tx, trimmedName)
    })
  }
  
  async getCategoryById(id: number): Promise<Category> {
    return this.databaseConnection.transactional(async tx => {
      const category = await this.categoryRepository.findById(tx, id)
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`)
      }
      return category
    })
  }

  async getAllCategories(): Promise<Category[]> {
    return this.databaseConnection.transactional(async tx => {
      return this.categoryRepository.findAll(tx)
    })
  }
}