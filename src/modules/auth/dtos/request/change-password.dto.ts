import { IsNotEmpty } from 'class-validator';

export class ChangePasswordRequest {
  @IsNotEmpty()
  password: string;
}
