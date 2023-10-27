import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //如果设置为 true，则验证器将去除任何没有任何修饰符的属性的已验证对象。
    whitelist:true,
    //将请求对象转换为dto
    transform:true,
    //如果设置为 true，则验证器不会剥离未列入白名单的属性，而是会抛出错误
    // forbidNonWhitelisted:true,
    transformOptions: {
      // 在全局层面上启用隐式类型转换
      enableImplicitConversion:true
    }
  }))
  await app.listen(3000);
}
bootstrap();
