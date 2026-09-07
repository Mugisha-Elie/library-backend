import { Injectable } from "@nestjs/common";
import { Category } from "../application/category/category.model";
import { ICategoryRepository } from "../application/category/category.repository.interface";
import type { Transaction } from "./database-connection.interface";

interface CategoryRow{
  id: number,
  name: string,
  created_at: Date
}

@Injectable()
export class CategoryRepository extends ICategoryRepository {
  private rowToDomain(row: CategoryRow): Category {
    return new Category(row.id, row.name, row.created_at)
  }

  async findById(tx: Transaction, id: number): Promise<Category | null> {
    const row = await tx.oneOrNone<CategoryRow>(
      `SELECT id, name, created_at
       FROM categories
       WHERE id = $(id)
      `,
      {id},
    )

    return row ? this.rowToDomain(row) : null
  }

  async findByName(tx: Transaction, name: string): Promise<Category | null> {
    const row = await tx.oneOrNone<CategoryRow>(
      `
      SELECT id, name, created_at
      FROM categories
      WHERE name = $(name)
      `,
      {name}
    )
    return row ? this.rowToDomain(row) : null
  }

  async findAll(tx: Transaction): Promise<Category[]> {
    const rows = await tx.manyOrNone<CategoryRow>(
      `SELECT id, name, created_at
      FROM categories
      ORDER BY name ASC
      `
    )
    return rows.map(row => this.rowToDomain(row))
  }
  
  async insert(tx: Transaction, name: string): Promise<Category> {
    const row = await tx.one<CategoryRow>(
      `INSERT INTO categories (name)
      VALUES ($(name))
      RETURNING id, name, created_at`,
      {name}
    )

    return this.rowToDomain(row)
  }
}