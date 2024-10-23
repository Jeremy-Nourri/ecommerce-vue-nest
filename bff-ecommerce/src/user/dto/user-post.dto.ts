import { IsNotEmpty } from 'class-validator';

export class UserPostDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}