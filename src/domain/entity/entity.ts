import { IsUUID } from 'class-validator';

export class Entity {
  @IsUUID('7')
  id: string;
}
