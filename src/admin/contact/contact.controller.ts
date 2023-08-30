import { Controller, Get, Render } from "@nestjs/common";

@Controller('contact')
export class ContactController {
    constructor() {}
    
    @Get()
    @Render('pages/contact')
    async get_contact_page() {
        return {
            title: 'İletişim'
        }
    }
}