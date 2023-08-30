import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Newsletter {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @CreateDateColumn()
    created_at:Date
    
}