import { Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entitiy";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) {
    }
    findAll(){
        return this.coffeeRepository.find()
    }
    async findOne(id:string){
        const coffee = await this.coffeeRepository.findOne({
            // @ts-ignore
            where:{id:id}
        });
        if (!coffee){
            throw new
            NotFoundException(`Coffee ${id}not found`)
        }
        return coffee
    }
    create(createCoffeeDto:any){
        const coffees = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffees)
    }
    async update(id:string, updateCoffeeDto:any){
        const coffee =await this.coffeeRepository.preload({
            id:+id,
            ...updateCoffeeDto
        });
        if (!coffee){
            throw new NotFoundException(`Coffee ${id} not found`);
        }
        return this.coffeeRepository.save(coffee)
    }
    async remove(id:string){
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee)
    }


}
