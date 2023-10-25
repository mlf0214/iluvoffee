import {HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entitiy";

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla']
       }];

    findAll(){
        return this.coffees
    }
    findOne(id:string){
        const coffee = this.coffees.find(item=>item.id === +id);
        if (!coffee){
            throw new
            NotFoundException(`Coffee ${id}not found`)
        }
        return coffee
    }
    create(createCoffeeDto:any){
        this.coffees.push(createCoffeeDto)
        return createCoffeeDto
    }
    update(id:string, updateCoffeeDto:any){
        const existingCoffee = this.findOne(id);
        if (!existingCoffee){
            throw new Error('Coffee not found');
        }else {
            this.coffees.push(updateCoffeeDto)
            this.remove(id)
        }
    }
    remove(id:string){
        const findIndex = this.coffees.findIndex(item=>item.id===+id);
        if (findIndex>=0){
            this.coffees.splice(findIndex, 1);
        }
    }


}
