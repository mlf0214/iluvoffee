import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity() //sql table===='coffee'
export class Coffee {
    @PrimaryGeneratedColumn()//设置主键
    id: number;
    @Column()
    name:string;
    @Column()
    brand:string;
    //开启数组支持
    @Column('json',{nullable:true})
    flavors:string[]
}


