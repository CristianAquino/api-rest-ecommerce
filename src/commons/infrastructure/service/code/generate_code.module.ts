import { Module } from '@nestjs/common';
import { GenerateCodeService } from './generate_code.service';

@Module({
  providers: [GenerateCodeService],
  exports: [GenerateCodeService],
})
export class GenerateCodeModule {}
