import { Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entitiy";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Flavor} from "./entities/flavor.entity";

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) {
    }
    findAll(){
        return this.coffeeRepository.find({
            relations:['flavors']
        })
    }
    async findOne(id:string){

        const coffee = await this.coffeeRepository.findOne({
            // @ts-ignore
            where:{id:id}
        }
            // @ts-ignore
        ,{
            relations:['flavors'],
            }
        );
        if (!coffee){
            throw new
            NotFoundException(`Coffee ${id}not found`)
        }
        return coffee
    }
    async create(createCoffeeDto:any){
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name=> this.preloadFlavorByName(name)));

        const coffees = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(coffees)
    }
    async update(id:string, updateCoffeeDto:any){
        const flavors = updateCoffeeDto.flavors&&(await Promise.all(updateCoffeeDto.flavors.map(name=> this.preloadFlavorByName(name))));
        const coffee =await this.coffeeRepository.preload({
            id:+id,
            ...updateCoffeeDto,
            flavors
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
private async preloadFlavorByName(name: string):Promise<Flavor>{
    const exisingFlavor =
        await this.flavorRepository.findOne({
            where: {name:name}
        });
        if (exisingFlavor){
            return exisingFlavor
        }
        return this.flavorRepository.create({name})
    }
}
