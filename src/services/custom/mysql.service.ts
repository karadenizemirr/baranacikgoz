import { ConfigService } from "@nestjs/config";
import { Contact } from "src/admin/contact/contact.model";
import { Newsletter } from "src/admin/newsletter/newsletter.model";
import { User } from "src/admin/user/user.model";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "clwxydcjair55xn0.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    port: 3306,
    username: "ri2pizjx2aedz6n1",
    password: "cjxfxc0lem8mz4u8",
    database: "lmf96pbrls52njff",
    synchronize: true,
    logging: true,
    entities: [User, Contact, Newsletter],
    subscribers: [],
    migrations: [],

})