import { Module } from "@nestjs/common";
import { UserController } from "../../controller/user/user.controller";
import { UserRepository } from "../../persistence";
import { IUserRepository } from "./user.repository.interface";
import { UserService } from "./user.service";
import { IUserService } from "./user.service.interface";

@Module({
  controllers: [UserController],
  providers: [
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IUserService, useClass: UserService }
  ],
  exports: [IUserRepository, IUserService]
})
export class UserModule{ }

