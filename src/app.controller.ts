import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    
    return {
      title: 'Anasafya'
    }
  }

  @Get('mobile')
  @Render('pages/mobile')
  async get_mobile(){
    return {
      title: "Mobil Uygulama"
    }
  }

  @Get('admin')
  @Render('pages/admin')
  async get_amin(){
    return {
      title: 'Yönetici Paneli'
    }
  }

}
