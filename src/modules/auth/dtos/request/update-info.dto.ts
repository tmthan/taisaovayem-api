import { IsEmpty } from 'class-validator';
export class UpdateInfoRequest {
  @IsEmpty()
  email: string;

  @IsEmpty()
  name: string;
}
