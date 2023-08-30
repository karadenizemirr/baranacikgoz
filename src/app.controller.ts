import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello(@I18n() i18n: I18nContext) {
    
    return {
      title: 'Anasafya',
      translate: i18n.t('home.base')
    }
  }

}
