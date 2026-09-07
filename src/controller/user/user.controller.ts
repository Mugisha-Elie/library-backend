import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IUserService } from "../../application/user";
import { RegisterUserDTO, UserDTO } from "./user.dto";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: UserDTO,
  })
  @ApiConflictResponse({ description: 'Email address already in use' })
  async register(@Body() dto: RegisterUserDTO): Promise<UserDTO> {
    const user = await this.userService.register({
      email: dto.email,
      plainPassword: dto.password,
      role: dto.role
    })

    return UserDTO.fromDomain(user)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user profile by ID' })
  @ApiOkResponse({
    description: 'User found',
    type: UserDTO
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDTO> {
    const user = await this.userService.getUserById(id)
    return UserDTO.fromDomain(user)
  }
}