import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import Rental from '../infra/typeorm/entities/Rental';

export default interface IRentalsRepository {
  createOrUpdate(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental | undefined>;
  findOpenedRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenedRentalByUse(user_id: string): Promise<Rental | undefined>;
  findByUser(user_id: string): Promise<Rental[]>;
}
