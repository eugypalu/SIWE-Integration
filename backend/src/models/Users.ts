import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { IUser } from '../interfaces/user.interface';

/**
 * User model class.
 * @property {number} id - The unique ID of the user.
 * @property {string} username - The username of the user.
 * @property {string} address - The address of the user.
 * @property {string} bio - The bio of the user.
 * @property {Date} createdAt - The date when the user was created.
 * @property {Date} updatedAt - The date when the user was last updated.
 */
class User extends Model implements IUser {
    public id!: number;
    public username!: string;
    public address!: string;
    public bio: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    address: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
}, {
    tableName: 'users',
    sequelize,
});

export default User;