import { Body, Controller, Get, Post, Render, Res, UseGuards } from "@nestjs/common";
import { AppDataSource } from "src/services/custom/mysql.service";
import { Newsletter } from "./newsletter.model";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('newsletter')
export class NewsletterController {
    private readonly newsletterRepository:any

    constructor() {
        this.newsletterRepository = AppDataSource.getRepository(Newsletter)
    }

    @Post()
    async post_newsletter(@Body() body:any, @Res() res:any){
        const newsletter = new Newsletter()
        newsletter.email = body.email
        await this.newsletterRepository.save(newsletter)

        res.redirect(302, '/')

        return {
            title: 'Abone Ol'
        }
    }

    @Get()
    @UseGuards(AuthGuard) 
    @Render('pages/admin/newsletter')
    async get_newsletter(){
        const newsletter = await this.newsletterRepository.find(
            {
                order: {
                    id: 'DESC'
                }
            }
        )

        return {
            title: 'Abone Ol',
            data: newsletter
        }
    }
}