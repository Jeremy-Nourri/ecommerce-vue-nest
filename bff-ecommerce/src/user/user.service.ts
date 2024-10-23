import { Injectable, UnauthorizedException, Logger } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { UserPostDto } from "./dto/user-post.dto"
import { UserDto } from "./dto/user.dto"
import { UserApiDto } from "./dto/user-api.dto"
import { firstValueFrom } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { AxiosError } from "axios"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    private readonly apiUrlAuth: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService

    ) {
        this.apiUrlAuth = this.configService.get<string>('URL_API_AUTH')
    }

    async signIn(userPostDto: UserPostDto): Promise<UserDto> {

        const userRequest$ = this.httpService
            .post<UserApiDto>(`${this.apiUrlAuth}`, userPostDto)
            .pipe(
                map((response) => this.mapToDto(response.data)),
                catchError((error: AxiosError) => {
                    this.logger.error(`Error while signing in user`, error)

                    console.error(error.response?.data)
                    throw new UnauthorizedException(`Invalid credentials`)
                })
            )

        return await firstValueFrom(userRequest$)
    }

    private mapToDto(userApi: UserApiDto): UserDto {
        return {
            id: userApi.id,
            email: userApi.email,
            firstName: userApi.firstName,
            lastName: userApi.lastName,
            username: userApi.username,
            accessToken: userApi.accessToken
        }
    }
}
