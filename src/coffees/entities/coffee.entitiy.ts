import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {JoinTable} from "typeorm";
import {Flavor} from "./flavor.entity";

@Entity() //sql table===='coffee'
export class Coffee {
    @PrimaryGeneratedColumn()//设置主键
    id: number;
    @Column()
    name:string;
    @Column()
    brand:string;
    // //开启数组支持
    // @Column('json',{nullable:true})
    // flavors:string[]

    @JoinTable()
    @ManyToMany(type => Flavor,
        (flavor) => flavor.coffees,
        {
            //支持级联插入
            cascade:true,
        })
    flavors:Flavor[]

    @Column({default:0})
    recommendations:number
}


