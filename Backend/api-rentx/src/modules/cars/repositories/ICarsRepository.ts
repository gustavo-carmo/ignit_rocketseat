import ICreateCarDTO from '../dtos/ICreateCarDTO';
import IListCarDTO from '../dtos/IListCarDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(data: IListCarDTO): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
