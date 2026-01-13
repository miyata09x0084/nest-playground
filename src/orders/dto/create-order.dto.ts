import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({}, { message: 'ユーザーIDは数値である必要があります' })
  @IsPositive({ message: 'ユーザーIDは正の数である必要があります' })
  userId: number;

  @IsNumber({}, { message: '商品IDは数値である必要があります' })
  @IsPositive({ message: '商品IDは正の数である必要があります' })
  productId: number;

  @IsNumber({}, { message: '数量は数値である必要があります' })
  @Min(1, { message: '数量は1以上である必要があります' })
  quantity: number;
}
