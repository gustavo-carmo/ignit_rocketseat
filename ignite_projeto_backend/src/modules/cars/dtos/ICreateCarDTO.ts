export default interface ICreateCarDTO {
  model: string;
  brand: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  category_id: string;
}
