import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class AuthService {
  private readonly context = 'AuthService';
  private readonly SALT_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  // ユーザー検証（Local Strategy用）
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  // ログイン（トークン発行）
  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    this.logger.log(this.context, `User logged in: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // ユーザー登録
  async register(registerDto: RegisterDto) {
    // メールアドレス重複チェック
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('このメールアドレスは既に登録されています');
    }

    // パスワードハッシュ化
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      this.SALT_ROUNDS,
    );

    // ユーザー作成
    const user = await this.usersService.createWithPassword(
      registerDto.name,
      registerDto.email,
      hashedPassword,
      registerDto.role || 'user',
    );

    this.logger.log(this.context, `New user registered: ${user.email}`);

    // 自動ログイン（トークン発行）
    return this.login(user);
  }
}
