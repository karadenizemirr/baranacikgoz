import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AppDataSource } from "src/services/custom/mysql.service";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt'
import { JwtService } from "src/services/custom/jwt.service";

@Injectable()
export class UserService {
    private readonly userRepository:any
    constructor(private jwtService:JwtService) {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async register(data:any){
        try{

            const control = await this.userRepository.findOne({
                where: {
                    email: data.email
                }
            })

            if (!control){
                const user = new User()
                user.name = data.name
                user.surname = data.surname
                user.email = data.email
                user.phone = data.phone
                user.password = bcrypt.hashSync(data.password, 5)
                this.userRepository.save(user)

                return true
            }

            return false

        }catch(err){
            throw new HttpException('Register failed', HttpStatus.BAD_REQUEST)
        }
    }


    async login(username:string, password:string){
        try {


            const control = await this.userRepository.findOne(
                {
                    where: {
                        email: username
                    }
                }
            )

            if (control){
                if (bcrypt.compareSync(password, control.password)){
                    const token = this.jwtService.generate_token({id: control.id})
                    return token
                }
            }

        }catch(err){
            throw new HttpException('Login failed', HttpStatus.BAD_REQUEST)
        }
    }
}