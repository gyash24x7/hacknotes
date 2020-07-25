import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserCreateInput {
	@IsNotEmpty() name: string;
	@IsNotEmpty() username: string;
	@IsNotEmpty() @IsEmail() email: string;
	@IsNotEmpty() @MinLength(8) password: string;
}

export class UserLoginInput {
	@IsNotEmpty() username: string;
	@IsNotEmpty() @MinLength(8) password: string;
}
