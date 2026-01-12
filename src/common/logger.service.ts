import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  log(context: string, message: string): void {
    console.log(`[${this.formatTimestamp()}] [LOG] [${context}] ${message}`);
  }

  warn(context: string, message: string): void {
    console.warn(`[${this.formatTimestamp()}] [WARN] [${context}] ${message}`);
  }

  error(context: string, message: string, trace?: string): void {
    console.error(`[${this.formatTimestamp()}] [ERROR] [${context}] ${message}`);
    if (trace) {
      console.error(trace);
    }
  }

  debug(context: string, message: string): void {
    console.debug(`[${this.formatTimestamp()}] [DEBUG] [${context}] ${message}`);
  }
}
