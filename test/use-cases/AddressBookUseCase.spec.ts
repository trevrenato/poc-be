import { AddressBookUseCase } from '../../src/use-cases';
import { AddressBookRepository } from '../../src/repositories';
import { AddressBookEntity } from '../../src/entities';

describe('AddressBookUseCase', () => {
  jest.spyOn(global.console, 'error');
  const createAddressBookSpy: jest.SpyInstance = jest.spyOn(AddressBookRepository.prototype, 'createAddressBook');
  const getAddressBookSpy: jest.SpyInstance = jest.spyOn(AddressBookRepository.prototype, 'getAddressBook');
  const getAddressBookByEmailSpy: jest.SpyInstance = jest.spyOn(
    AddressBookRepository.prototype,
    'getAddressBookByEmail',
  );
  const updateAddressBookSpy: jest.SpyInstance = jest.spyOn(AddressBookRepository.prototype, 'updateAddressBook');
  const deleteAddressBookSpy: jest.SpyInstance = jest.spyOn(AddressBookRepository.prototype, 'deleteAddressBook');

  const addressBookEntity: AddressBookEntity = new AddressBookEntity({
    firstName: 'Batman Mock',
    lastName: 'Wayne Mock',
    email: 'batman@wayne.com',
    phone: '5551234',
  });

  const newAddressBookEntity: AddressBookEntity = new AddressBookEntity({
    firstName: 'Batman Mock Updated',
    lastName: 'Wayne Mock Updated',
    email: 'batman@wayne.com',
    phone: '5551234',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('createAddressBook', async () => {
    const addressBookUseCase = new AddressBookUseCase();
    await addressBookUseCase.createAddressBook(addressBookEntity);
    expect(createAddressBookSpy).toBeCalledWith(addressBookEntity);
  });

  it('getAddressBook', async () => {
    const addressBookUseCase = new AddressBookUseCase();
    await addressBookUseCase.getAddressBook();
    expect(getAddressBookSpy).toBeCalled();
  });

  it('getAddressBookByEmail', async () => {
    const addressBookUseCase = new AddressBookUseCase();
    await addressBookUseCase.getAddressBookByEmail(addressBookEntity);
    expect(getAddressBookByEmailSpy).toBeCalled();
  });

  it('updateAddressBook', async () => {
    const addressBookUseCase = new AddressBookUseCase();
    await addressBookUseCase.updateAddressBook(addressBookEntity, newAddressBookEntity);
    expect(updateAddressBookSpy).toBeCalled();
  });

  it('deleteAddressBook', async () => {
    const addressBookUseCase = new AddressBookUseCase();
    await addressBookUseCase.deleteAddressBook(addressBookEntity);
    expect(deleteAddressBookSpy).toBeCalled();
  });
});
