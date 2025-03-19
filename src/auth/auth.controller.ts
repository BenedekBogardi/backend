import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {Self} from "./current-user.decorator";
import { RegisterDto } from "src/users/register.dto";
import { JwtAuthGuard } from "./custom-auth.guard";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("/login")
    @UseGuards(AuthGuard('local'))
    async login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }

    @Post("/logout")
    async logout(@Request() req) {
        return
    }
    @Post("/register")
    async register(@Body() registerData: RegisterDto) {
        return this.authService.register(registerData);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/self")
    async self(@Self() user) {
        console.log("Self at auth controller: ", this.authService.self(user));
        return this.authService.self(user);
    }
}