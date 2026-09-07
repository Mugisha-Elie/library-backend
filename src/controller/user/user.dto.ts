import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { User, UserRole } from "../../application/user";

export class RegisterUserDTO {
  @ApiProperty({
    description: 'Unique email address',
    example: 'alice@example.com'
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty()
  email!: string

  @ApiProperty({
    description: 'Plain text password (minimum 6 characters)',
    example: 'strongPass123!',
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string

  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: ['MEMBER', 'ADMIN'],
    default: 'MEMBER'
  })
  @IsOptional()
  @IsIn(['MEMBER', 'ADMIN'], { message: 'Role must be MEMBER or ADMIN' })
  role?: UserRole
}


export class UserDTO {
  @ApiProperty({ example: 1 })
  id!: number

  @ApiProperty({ example: 'alice@example.com' })
  email!: string

  @ApiProperty({ example: 'MEMBER', enum: ['MEMBER', 'ADMIN'] })
  role!: string

  @ApiProperty({ example: '2026-09-07T10:00:00.000Z' })
  createdAt!: string

  static fromDomain(user: User): UserDTO {
    const dto = new UserDTO()
    dto.id = user.id
    dto.email = user.email
    dto.role = user.role
    dto.createdAt = user.createdAt.toISOString()

    return dto;
  }
}