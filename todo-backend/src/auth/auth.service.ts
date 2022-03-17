import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInDto} from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
        
    ){}
    async signup(dto: AuthDto){
        // generate password hash
        const hash = await argon.hash(dto.password);
        // see if the email already exists
        const emailExists = await this.prisma.user.findUnique({where: {email: dto.email}});
        const userNameExists = await this.prisma.user.findUnique({where: {username: dto.username}})
        if(userNameExists){
            return {
                status: HttpStatus.BAD_REQUEST,
                message: "username already taken!"
            }
        }
        if(emailExists){
            return {
                status: HttpStatus.BAD_REQUEST,
                message: "user with the given email already exists"
            }
        }        
        // save user in db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                hash,
                firstName: dto.firstName,
                middleName: dto.middleName,
                lastName: dto.lastName
            }
        });
        // return user
        delete user["hash"];
        return user;
    }

    async signin(dto: SignInDto){
        console.log(dto);
        // find the user by username 
        const user = await this.prisma.user.findUnique({where: {username: dto.username}});
        if(!user){
            throw new ForbiddenException("credentials incorrect");
        }
        // compare password
        const matchPassword = await argon.verify(user.hash, dto.password);
        if(!matchPassword){
            throw new ForbiddenException("credentials donot match");
        }

        return this.signToken(user.id, user.username);
    }

    async signToken(userId: number, username: string):Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            username,
        }
        const secret = this.config.get("JWT_SECRET");
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        });
        return {
            access_token: token
        }
    }
}
