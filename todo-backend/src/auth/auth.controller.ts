import { HttpCode } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Body, Controller, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, SignInDto } from "./dto";


@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto){ //dto: data transfer object        
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: SignInDto){
        return this.authService.signin(dto);
    }
}   