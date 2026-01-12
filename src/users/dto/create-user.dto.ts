import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '名前は文字列である必要があります' })
  @MinLength(1, { message: '名前は必須です' })
  @MaxLength(50, { message: '名前は50文字以内で入力してください' })
  name: string;

  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  email: string;
}
