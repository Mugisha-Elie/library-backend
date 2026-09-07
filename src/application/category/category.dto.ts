import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Category } from "./category.model";

export class CreateCategoryDTO{
  @ApiProperty({
    description: 'The unique name of the category',
    example: 'Science Fiction',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string
}

export class CategoryDTO{
  @ApiProperty({ example: 1 })
  id!: number

  @ApiProperty({ example: 'Science Fiction' })
  name!: string

  @ApiProperty({ example: '2026-09-04T10:00:00.000Z' })
  createdAt!: string

  static fromDomain(category: Category): CategoryDTO {
    const dto = new CategoryDTO()
    dto.id = category.id
    dto.name = category.name
    dto.createdAt = category.createdAt.toISOString()
    return dto;
  }
}