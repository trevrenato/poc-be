import { AddressBookRepository } from '@repositories';
import { AddressBook } from '@models';
import { AddressBookEntity } from '@entities';

export class AddressBookUseCase {
  constructor(private readonly addressBookRepository = new AddressBookRepository()) {}

  public createAddressBook(addressBookEntity: AddressBookEntity): Promise<AddressBook> {
    return this.addressBookRepository.createAddressBook(addressBookEntity);
  }

  public getAddressBook(): Promise<AddressBook> {
    return this.addressBookRepository.getAddressBook();
  }

  public getAddressBookByEmail(addressBookEntity: AddressBookEntity): Promise<AddressBook> {
    return this.addressBookRepository.getAddressBookByEmail(addressBookEntity);
  }

  public updateAddressBook(
    addressBookEntity: AddressBookEntity,
    newAddressBookEntity: AddressBookEntity,
  ): Promise<AddressBook> {
    return this.addressBookRepository.updateAddressBook(addressBookEntity, newAddressBookEntity);
  }

  public deleteAddressBook(addressBookEntity: AddressBookEntity): Promise<void> {
    return this.addressBookRepository.deleteAddressBook(addressBookEntity);
  }
}
