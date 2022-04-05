export interface IStorageData {
  file: string;
  folder: string;
}
export default interface IStorageProvider {
  save(data: IStorageData): Promise<string>;
  delete(data: IStorageData): Promise<void>;
}
