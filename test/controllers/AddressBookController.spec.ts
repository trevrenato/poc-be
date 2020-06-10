import { AddressBookClient } from '../../src/clients';
import { AddressBookRepository } from '../../src/repositories';
import { AddressBookEntity } from '../../src/entities';

describe('AddressBookRepository', () => {
  const addressBookRepository = new AddressBookRepository();
  const createSpy: jest.SpyInstance = jest.spyOn(AddressBookClient, 'create');
  const findAllSpy: jest.SpyInstance = jest.spyOn(AddressBookClient, 'findAll');
  const findOneSpy: jest.SpyInstance = jest.spyOn(AddressBookClient, 'findOne');
  const updateSpy: jest.SpyInstance = jest.spyOn(AddressBookClient, 'update');
  const destroySpy: jest.SpyInstance = jest.spyOn(AddressBookClient, 'destroy');

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
  jest.spyOn(global.console, 'error');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('createAddressBook', async () => {
    createSpy.mockReturnValueOnce(Promise.resolve(undefined));

    await addressBookRepository.createAddressBook(addressBookEntity);
    expect(createSpy).toBeCalledWith(addressBookEntity);
  });

  it('createAddressBook.catch', async () => {
    const errorMessage = 'error creating address';
    createSpy.mockReturnValueOnce(Promise.reject(errorMessage));

    try {
      await addressBookRepository.createAddressBook(addressBookEntity);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });

  it('getAddressBook', async () => {
    findAllSpy.mockReturnValueOnce(Promise.resolve(undefined));

    await addressBookRepository.getAddressBook();
    expect(findAllSpy).toBeCalled();
  });

  it('getAddressBook.catch', async () => {
    const errorMessage = 'error reading address';
    findAllSpy.mockReturnValueOnce(Promise.reject(errorMessage));

    try {
      await addressBookRepository.getAddressBook();
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });

  it('getAddressBookByEmail', async () => {
    findOneSpy.mockReturnValueOnce(Promise.resolve(undefined));

    await addressBookRepository.getAddressBookByEmail(addressBookEntity);
    expect(findOneSpy).toBeCalledWith({
      where: { email: addressBookEntity.email },
    });
  });

  it('getAddressBookByEmail.catch', async () => {
    const errorMessage = 'error reading address';
    findOneSpy.mockReturnValueOnce(Promise.reject(errorMessage));

    try {
      await addressBookRepository.getAddressBookByEmail(addressBookEntity);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });

  it('updateAddressBook', async () => {
    updateSpy.mockReturnValueOnce(Promise.resolve(undefined));

    await addressBookRepository.updateAddressBook(addressBookEntity, newAddressBookEntity);
    expect(updateSpy).toBeCalledWith(newAddressBookEntity, {
      where: {
        email: addressBookEntity.email,
      },
      returning: true,
    });
  });

  it('updateAddressBook.catch', async () => {
    const errorMessage = 'error reading address';
    updateSpy.mockReturnValueOnce(Promise.reject(errorMessage));

    try {
      await addressBookRepository.updateAddressBook(addressBookEntity, newAddressBookEntity);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });

  it('deleteAddressBook', async () => {
    destroySpy.mockReturnValueOnce(Promise.resolve(undefined));

    const addressBookEntity: AddressBookEntity = new AddressBookEntity({
      firstName: 'Batman Mock',
      lastName: 'Wayne Mock',
      email: 'batman@wayne.com',
      phone: '5551234',
    });

    await addressBookRepository.deleteAddressBook(addressBookEntity);
    expect(destroySpy).toBeCalledWith({
      where: { email: addressBookEntity.email },
      limit: 1,
    });
  });

  it('deleteAddressBook.catch', async () => {
    const errorMessage = 'error reading address';
    destroySpy.mockReturnValueOnce(Promise.reject(errorMessage));

    try {
      await addressBookRepository.deleteAddressBook(addressBookEntity);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});
