import {
  IsString,
  IsNumber,
  IsPositive,
  Min,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: '商品名は文字列である必要があります' })
  @MaxLength(100, { message: '商品名は100文字以内で入力してください' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: '価格は数値である必要があります' })
  @IsPositive({ message: '価格は正の数である必要があります' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: '在庫数は数値である必要があります' })
  @Min(0, { message: '在庫数は0以上である必要があります' })
  stock?: number;
}
