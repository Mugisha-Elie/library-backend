import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { IDatabaseConnection } from "../../persistence";
import { User } from "./user.model";
import { IUserRepository } from "./user.repository.interface";
import { IUserService, RegisterUserData } from "./user.service.interface";

const SALT_ROUNDS = 10

@Injectable()
export class UserService extends IUserService {
  constructor(
    private readonly databaseConnection: IDatabaseConnection,
    private readonly userRespository: IUserRepository,
  ) {
    super()
  }

  async register(data: RegisterUserData): Promise<User> {
    const normalizedEmail = data.email.trim().toLowerCase()

    return this.databaseConnection.transactional(async tx => {
      const existingUser = await this.userRespository.findByEmail(tx, normalizedEmail)
      if (existingUser) {
        throw new ConflictException(`User with email "${normalizedEmail}" already exists`)
      }

      const passwordHash = await bcrypt.hash(data.plainPassword, SALT_ROUNDS)

      return this.userRespository.insert(tx, {
        email: normalizedEmail,
        passwordHash,
        role: data.role
      })
    })
  }

  async getUserById(id: number): Promise<User> {
    return this.databaseConnection.transactional(async tx => {
      const user = await this.userRespository.findById(tx, id)

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" was not found`)
      }

      return user;
    })
  }
}