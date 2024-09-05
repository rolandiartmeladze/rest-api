export class CreateUserDto {
   id?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly avatarPath?: string;
}
