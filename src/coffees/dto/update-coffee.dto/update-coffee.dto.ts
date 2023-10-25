import {CreateCoffeeDto} from "../create-coffee.dto/create-coffee.dto";
import {PartialType} from "@nestjs/mapped-types";
export class UpdateCoffeeDto extends
    PartialType(CreateCoffeeDto){
    //继承于CreateCoffeeDto中的属性为
    // 可选 并且应用其所有验证规则

}
