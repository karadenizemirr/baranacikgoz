import { Injectable } from "@nestjs/common";
import * as jsonwebtoken from 'jsonwebtoken'


@Injectable()
export class JwtService {
    private readonly secret_key = "baranacikgoz"
    constructor() {}

    generate_token(payload:any){
        try{

            return jsonwebtoken.sign(payload, this.secret_key, {expiresIn:'1h'})

        }catch(err){
            console.log('Token generate error')
        }
    }

    verify_token(token:string){
        try{

            return jsonwebtoken.verify(token, this.secret_key)

        }catch(err){
            console.log('Token verify error')
        }
    }
}