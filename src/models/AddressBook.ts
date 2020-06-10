export class AddressBook {
  public id: number;

  public firstName: string;

  public lastName: string;

  public email: string;

  public phone: string;

  public created_at: Date;

  public updated_at: Date;

  constructor(addressBook: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
  }) {
    this.id = addressBook.id;
    this.firstName = addressBook.firstName;
    this.lastName = addressBook.lastName;
    this.email = addressBook.email;
    this.phone = addressBook.phone;
    this.created_at = addressBook.created_at;
    this.updated_at = addressBook.updated_at;
  }
}
