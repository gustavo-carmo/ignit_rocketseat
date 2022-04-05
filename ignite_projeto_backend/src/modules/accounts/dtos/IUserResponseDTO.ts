export default interface IUserResponseDTO {
  id: string;
  name: string;
  avatar: string;
  email: string;
  driver_license: string;
  avatar_url(): string | null;
}
