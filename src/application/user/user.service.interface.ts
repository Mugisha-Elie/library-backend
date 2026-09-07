import { User, UserRole } from "./user.model";

export interface RegisterUserData {
  email: string
  plainPassword: string
  role?: UserRole
}

export abstract class IUserService {
  abstract register(data: RegisterUserData): Promise<User>
  abstract getUserById(id: number): Promise<User>
}