import { inject, injectable } from 'tsyringe';

import ICarImagesRepository from '@modules/cars/repositories/ICarImagesRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export default class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const promises: any[] = [];

    images_name.forEach(async (image_name) => {
      promises.push(
        await this.carImagesRepository.create({
          car_id,
          image_name,
        }),
      );
    });

    const imagesToDelete = await this.carImagesRepository.findAllByCar(car_id);

    imagesToDelete.forEach(async (carImage) => {
      promises.push(await this.carImagesRepository.delete(carImage.id));
      promises.push(await deleteFile(`./tmp/car/${carImage.image_name}`));
    });

    await Promise.all(promises);
  }
}
