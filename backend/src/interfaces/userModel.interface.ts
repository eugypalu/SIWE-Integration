import { Model } from 'sequelize';

export interface IUserModel extends Model {
  username: string;
  bio: string;
  address: string;
}