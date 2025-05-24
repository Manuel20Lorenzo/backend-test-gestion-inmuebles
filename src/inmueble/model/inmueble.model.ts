import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/model/user.model'; // Asegúrate de que esta ruta sea correcta

@Table({
  tableName: 'houses',
  timestamps: true, // para createdAt y updatedAt
})
export class House extends Model<House>{
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING, // o ENUM si tienes estados específicos
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sellerId: number;

  @BelongsTo(() => User)
  seller: User;
}
