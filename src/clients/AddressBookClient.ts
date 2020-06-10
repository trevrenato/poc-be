import { Model, Table, Column, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { AddressBook } from '@models';

@Table({ tableName: 'address_book' })
export class AddressBookClient extends Model<AddressBook> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @Column({ field: 'first_name' })
  public firstName: string;

  @Column({ field: 'last_name' })
  public lastName: string;

  @Unique
  @Column
  public email: string;

  @Column
  public phone: string;

  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;
}
