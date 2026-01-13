import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: '名前は文字列である必要があります' })
  @MinLength(1, { message: '名前は必須です' })
  @MaxLength(50, { message: '名前は50文字以内で入力してください' })
  name: string;

  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  email: string;

  @IsString({ message: 'パスワードは文字列である必要があります' })
  @MinLength(8, { message: 'パスワードは8文字以上で入力してください' })
  password: string;

  @IsOptional()
  @IsIn(['admin', 'user', 'guest'], {
    message: 'ロールはadmin, user, guestのいずれかです',
  })
  role?: string;
}
