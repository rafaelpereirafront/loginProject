import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import {hashSync} from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  cryptPassword(){
    this.password = hashSync(this.password, 10)
  }
}


