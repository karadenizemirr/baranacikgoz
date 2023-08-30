import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AppDataSource } from "src/services/custom/mysql.service";
import { Contact } from "./contact.model";

@Injectable()
export class ContactService {
    private contactRepository:any
    constructor() {
        this.contactRepository = AppDataSource.getRepository(Contact)
    }

    async create_contact(data:any){
        try{
            const contact = new Contact()
            contact.name = data.name
            contact.surname = data.surname
            contact.email = data.email
            contact.phone = data.phone
            contact.message = data.message
            await this.contactRepository.save(contact)

            return true
        }catch(err){
            console.log(err)
            throw new HttpException('Send message error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_all(){
        try{

            const data = await this.contactRepository.find(
                {
                    order: {
                        created_at: 'DESC'
                    }
                }
            )

            return data

        }catch(err){
            throw new HttpException('Get all contact error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}