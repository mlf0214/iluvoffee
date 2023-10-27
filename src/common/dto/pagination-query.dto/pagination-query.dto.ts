
import {IsOptional, IsPositive} from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    //设置了
        // transformOptions: {
        //       // 在全局层面上启用隐式类型转换
        //       enableImplicitConversion:true
        //     }
        //可以省略
    // @Type(()=>Number)
    limit:number

    @IsOptional()
    @IsPositive()
    // @Type(()=>Number)
    offset:number
}
