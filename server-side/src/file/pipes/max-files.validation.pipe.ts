import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MaxFilesValidationPipe
  implements PipeTransform<Array<Express.Multer.File>>
{
  constructor(private readonly maxFiles: number) {}

  transform(files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Необходимо загрузить хотя бы один файл');
    }

    if (files.length > this.maxFiles) {
      throw new BadRequestException(
        `Допускается загрузка не более ${this.maxFiles} файлов. Вы загрузили ${files.length}`,
      );
    }
    return files;
  }
}
