import { AddressBookEntity } from '../../src/entities';

describe('AddressBookEntity', () => {
  it('construct', () => {
    const addressBookEntity = new AddressBookEntity({
      firstName: 'Test firstName',
      lastName: 'Test lastname',
      email: 'Test email',
      phone: 'Test phone',
    });
    expect(addressBookEntity).toBeInstanceOf(AddressBookEntity);
  });
});
