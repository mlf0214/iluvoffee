import {IsString} from "class-validator";
export class CreateCoffeeDto {
    //验证是否为字符串
    @IsString()
    readonly name:string;

    @IsString()
    readonly brand:string;
    //是否为字符串数组
    @IsString({each:true})
    readonly flavors:string[]
}
