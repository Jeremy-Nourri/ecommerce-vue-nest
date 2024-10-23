import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const frontendUrl = app.get(ConfigService).get<string>("FRONTEND_URL")

    app.enableCors({
        origin: frontendUrl,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
