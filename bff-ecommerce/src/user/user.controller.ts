import { Body, Controller, Post } from '@nestjs/common';
import { UserPostDto } from './dto/user-post.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { log } from 'console';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    async registerUser(@Body() userPostDto: UserPostDto): Promise<UserDto> {
        
        return this.userService.signIn(userPostDto);
    }


}
