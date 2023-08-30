import { Body, Controller, Get, Post, Render, Res, Session } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import * as secureSession from '@fastify/secure-session'

@Controller('user')
export class UserControler {
    constructor(private userService: UserService) {}

    @Get('register')
    @Render('pages/admin/register')
    async get_register_page(){
        return {
            title:'Kayıt Oluştur'
        }
    }

    @Post('register')
    async post_register(@Body() bodyData:any, @Res() res:Response){
        
        const register = await this.userService.register(bodyData)

        if (register){
            res.redirect(302, '/user/login')
        }

        res.redirect(302, '/user/register')

        return {
            title: 'Kayıt Oluştur'
        }
    }

    @Get('login')
    @Render('pages/admin/login')
    async get_login(){
        return {
            title: 'Giriş Yap'
        }
    }

    @Post('login')
    async post_login(@Body() bodyData:any, @Res() res:Response, @Session() session:secureSession.Session){
    
        const token = await this.userService.login(bodyData.email, bodyData.password)
        
        if (token){
            // login success
            session.set('token', token)
            res.redirect(302, '/')
        }

        res.redirect(302, '/user/login')
        return {
            title: 'Giriş Yap'
        }
    }

    @Get('logout')
    async get_logout(@Res() res:Response, @Session() session:secureSession.Session){
        session.delete()
        res.redirect(302, '/user/login')
    }
    
}