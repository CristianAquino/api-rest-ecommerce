import { Injectable } from '@nestjs/common';
import { IGenerateCodeService } from 'src/commons/domain/repository/generate_code.interface';

@Injectable()
export class GenerateCodeService implements IGenerateCodeService {
  constructor(
    private value = true,
    private code = '',
    private lake = 'abcdefghijklmnopqrstuvwxyz0123456789',
  ) {}

  generateCode(): string {
    while (this.value) {
      const nuevo = this.lake.charAt(
        Math.floor(Math.random() * (this.lake.length - 1)),
      );
      if (!this.getCode.includes(nuevo)) {
        this.setCode = nuevo;
      }
      if (this.getCode.length === 6) {
        this.value = false;
      }
    }
    return this.getCode;
  }

  get getCode(): string {
    return this.code.toLocaleUpperCase();
  }

  set setCode(code: string) {
    this.code += code;
  }
}
