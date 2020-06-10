export class AddressBookEntity {
  public firstName: string;

  public lastName: string;

  public email: string;

  public phone: string;

  constructor(addressBookEntity: { firstName: string; lastName: string; email: string; phone: string }) {
    this.firstName = addressBookEntity.firstName;
    this.lastName = addressBookEntity.lastName;
    this.email = addressBookEntity.email;
    this.phone = addressBookEntity.phone;
  }
}
