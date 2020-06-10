import { AddressBook } from '../../src/models';

describe('AddressBook', () => {
  it('construct', () => {
    const dateNow = new Date();
    const addressBook = new AddressBook({
      id: 1,
      firstName: 'Test firstName',
      lastName: 'Test lastname',
      email: 'Test email',
      phone: 'Test phone',
      created_at: dateNow,
      updated_at: dateNow,
    });
    expect(addressBook).toBeInstanceOf(AddressBook);
  });
});
