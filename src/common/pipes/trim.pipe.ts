import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    // 文字列の場合はトリム
    if (typeof value === 'string') {
      return value.trim();
    }

    // オブジェクトの場合は各プロパティをトリム
    if (typeof value === 'object' && value !== null) {
      const trimmed: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(value)) {
        trimmed[key] = typeof val === 'string' ? val.trim() : val;
      }
      return trimmed;
    }

    return value;
  }
}
