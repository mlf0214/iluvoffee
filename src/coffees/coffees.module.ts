import { Module } from '@nestjs/common';
import {CoffeesController} from "./coffees.controller";
import {CoffeesService} from "./coffees.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Coffee} from "./entities/coffee.entitiy";
import {Flavor} from "./entities/flavor.entity";
import {EventEntity} from "../events/entities/event.entity/event.entity";

@Module({
    //映射实体类
    imports:[TypeOrmModule.forFeature([Coffee,Flavor,EventEntity])],
    controllers:[CoffeesController]
    ,providers:[CoffeesService]})
export class CoffeesModule {}
