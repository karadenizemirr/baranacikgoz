import { User } from "src/admin/user/user.model";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456789",
    database: "baranacikgoz",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],

})