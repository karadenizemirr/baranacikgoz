import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as secureSession from 'fastify-secure-session'


@Injectable()
export class AuthInterceptors implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        const session = request.session as secureSession.Session

        let isLogin = false
        if (session && session.get('token')){
            isLogin = true
        }
        response.locals.isLogin = isLogin
        return next.handle()
    }
}