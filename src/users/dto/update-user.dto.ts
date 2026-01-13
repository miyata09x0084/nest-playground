import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: '名前は文字列である必要があります' })
  @MinLength(1, { message: '名前は必須です' })
  @MaxLength(50, { message: '名前は50文字以内で入力してください' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  email?: string;
}
