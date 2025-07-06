import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
  async savingFiles(files: Express.Multer.File[], folder: string = 'sneakers') {
    const uploadedFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadedFolder);

    const res: FileResponse[] = await Promise.all(
      files.map(async file => {
        const name = `${Date.now()}-${file.originalname}`;

        await writeFile(`${uploadedFolder}/${name}`, file.buffer);

        return {
          url: `/uploads/${folder}/${name}`,
          name: name,
        };
      }),
    );

    return res;
  }
}
