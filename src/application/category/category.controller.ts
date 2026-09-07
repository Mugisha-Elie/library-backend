import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse, 
  ApiOkResponse,
  ApiOperation, 
  ApiTags
} from '@nestjs/swagger'
import { ICategoryService } from "./category.service.interface";
import { CategoryDTO, CreateCategoryDTO } from "./category.dto";

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: ICategoryService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new book category' })
  @ApiCreatedResponse({
    description: 'Category created successfully',
    type: CategoryDTO
  })
  @ApiConflictResponse({ description: 'Category name already exists' })
  async createCategory(
    @Body() dto: CreateCategoryDTO,
  ): Promise<CategoryDTO> {
    const category = await this.categoryService.createCategory(dto.name)
    return CategoryDTO.fromDomain(category);
  }

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  @ApiOkResponse({
    description: 'List of all categories',
    type: [CategoryDTO]
  })
  async getAllCategories(): Promise<CategoryDTO[]>{
    const categories = await this.categoryService.getAllCategories();
    return categories.map(category => CategoryDTO.fromDomain(category))
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiOkResponse({
    description: 'Category found',
    type: CategoryDTO
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryDTO>{
    const category = await this.categoryService.getCategoryById(id)
    return CategoryDTO.fromDomain(category)
  }
}