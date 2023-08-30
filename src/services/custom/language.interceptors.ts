import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LanguageInterceptors implements NestInterceptor{
    constructor(private readonly i18n: I18nService) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const res = context.switchToHttp().getResponse();

        let translate = this.i18n.t('home.base')

        res.locals.translate = translate
        return next.handle();
    }   
}