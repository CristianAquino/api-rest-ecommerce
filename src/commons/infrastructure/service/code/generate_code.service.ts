import { IGenerateCodeService } from '@commons/repository/generate_code.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateCodeService implements IGenerateCodeService {
  private value = true;
  private code = '';
  private lake = 'abcdefghijklmnopqrstuvwxyz0123456789';

  generateCode(): string {
    while (this.value) {
      const nuevo = this.lake.charAt(
        Math.floor(Math.random() * (this.lake.length - 1)),
      );
      if (!this.getCode.includes(nuevo.toLocaleUpperCase())) {
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
