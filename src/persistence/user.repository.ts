import { Injectable } from "@nestjs/common";
import { User, UserRole } from "../application/user/user.model";
import { CreateUserData, IUserRepository } from "../application/user/user.repository.interface";
import { type Transaction } from "./database-connection.interface";

interface UserRow {
  id: number
  email: string
  password_hash: string
  role: string
  created_at: Date
}

@Injectable()
export class UserRepository extends IUserRepository{
  private rowToDomain(row: UserRow): User {
    return new User(
      row.id,
      row.email,
      row.password_hash,
      row.role as UserRole,
      row.created_at
    )
  }

  async findById(tx: Transaction, id: number): Promise<User | null> {
    const row = await tx.oneOrNone<UserRow>(
      `SELECT id, email, password_hash, role, created_at
      FROM users
      WHERE id = $(id)
      `,
      {id},
    )

    return row ? this.rowToDomain(row) : null
  }

  async findByEmail(tx: Transaction, email: string): Promise<User | null> {
    const row = await tx.oneOrNone<UserRow>(
      `SELECT id, email, password_hash, created_at
      FROM users
      WHERE email = $(email)
      `,
      {email}
    )

    return row ? this.rowToDomain(row) : null
  }

  async insert(tx: Transaction, data: CreateUserData): Promise<User>{
    const role = data.role || 'MEMBER';

    const row = await tx.one<UserRow>(
      `INSERT INTO users (email, password_hash, role)
      VALUES ($(email), $(passwordHash), $(role))
      RETURNING id, email, password_hash, role, created_at
      `,
      {
        email: data.email,
        passwordHash: data.passwordHash,
        role,
      }
    )
    return this.rowToDomain(row)
  }
}