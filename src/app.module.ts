import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { UserModule } from './admin/user/user.module';
import { JwtService } from './services/custom/jwt.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptors } from './auth/auth.interceptors';
import { ContactModule } from './admin/contact/contact.module';
import { LanguageInterceptors } from './services/custom/language.interceptors';
import { NewsletterModule } from './admin/newsletter/newsletter.module';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'tr',
      loaderOptions:{
        path: path.join(__dirname, 'src/i18n/'),
        watch: true,
        isGlobal: true,
      },
      resolvers:[
        {use:QueryResolver, options: ['lang']},
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang'])
      ]
    }),
    UserModule,
    ContactModule,
    NewsletterModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass:AuthInterceptors
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:LanguageInterceptors
    }
  ],
  exports: [JwtService]
})
export class AppModule {}
