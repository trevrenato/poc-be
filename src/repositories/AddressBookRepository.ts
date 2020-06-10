import { AddressBookClient } from '@clients';
import { AddressBookEntity } from '@entities';
import { AddressBook } from '@models';

export class AddressBookRepository {
  public async createAddressBook(addressBookEntity: AddressBookEntity): Promise<AddressBook> {
    return await AddressBookClient.create(addressBookEntity).catch((e) => {
      return e;
    });
  }

  public async getAddressBook(): Promise<AddressBook> {
    return await AddressBookClient.findAll().catch((e) => {
      console.error(e);
      return e;
    });
  }

  public async getAddressBookByEmail(addressBookEntity: AddressBookEntity): Promise<AddressBook> {
    return await AddressBookClient.findOne({
      where: { email: addressBookEntity.email },
    }).catch((e) => {
      console.error(e);
      return e;
    });
  }

  public async updateAddressBook(
    addressBookEntity: AddressBookEntity,
    newAddressBookEntity: AddressBookEntity,
  ): Promise<AddressBook> {
    return await AddressBookClient.update(newAddressBookEntity, {
      where: {
        email: addressBookEntity.email,
      },
      returning: true,
    }).catch((e) => {
      console.error(e);
      return e;
    });
  }

  public async deleteAddressBook(addressBookEntity: AddressBookEntity): Promise<void> {
    return await AddressBookClient.destroy({
      where: { email: addressBookEntity.email },
      limit: 1,
    }).catch((e) => {
      console.error(e);
      return e;
    });
  }
}

export default AddressBookRepository;
