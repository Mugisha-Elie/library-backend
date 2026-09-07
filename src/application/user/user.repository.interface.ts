import type { Transaction } from "../../persistence";
import { User, UserRole } from "./user.model";

export interface CreateUserData {
  email: string
  passwordHash: string
  role?: UserRole
}

export abstract class IUserRepository{
  abstract findById(tx: Transaction, id: number): Promise<User | null>
  abstract findByEmail(tx: Transaction, email: string): Promise<User | null>
  abstract insert(tx: Transaction, data: CreateUserData): Promise<User>
}