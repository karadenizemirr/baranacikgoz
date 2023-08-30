import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import { ContactService } from "./contact.service";

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {}
    
    @Get()
    @Render('pages/contact')
    async get_contact_page() {
        return {
            title: 'İletişim'
        }
    }

    @Post()
    async post_contact(@Body() body:any, @Res() res:any){
        const send = await this.contactService.create_contact(body)
        
        if (send){
            res.redirect(302, '/contact')
        }
        return {
            title: 'İletişim'
        }
    }

    @Get('list')
    @Render('pages/admin/message')
    async get_contact_list_page(){

        const data = await this.contactService.get_all()

        return {
            title: 'Tüm Mesajlar',
            data: data
        }
    } 
}