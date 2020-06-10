import { Router, Request, Response } from 'express';
import { AddressBookRoute } from '../../src/routes/AddressBookRoute';
import { AddressBookController } from '../../src/controllers/AddressBookController';

describe('AddressBookRoute', () => {
  const addressBookRoute = new AddressBookRoute();
  const postSpy: jest.SpyInstance = jest.spyOn(addressBookRoute.router, 'post');
  const getSpy: jest.SpyInstance = jest.spyOn(addressBookRoute.router, 'get');
  const patchSpy: jest.SpyInstance = jest.spyOn(addressBookRoute.router, 'patch');
  const deleteSpy: jest.SpyInstance = jest.spyOn(addressBookRoute.router, 'delete');

  const createAddressBookSpy: jest.SpyInstance = jest
    .spyOn(AddressBookController.prototype, 'createAddressBook')
    .mockReturnThis();
  const getAddressBookByEmailSpy: jest.SpyInstance = jest
    .spyOn(AddressBookController.prototype, 'getAddressBookByEmail')
    .mockReturnThis();
  const getAddressBookSpy: jest.SpyInstance = jest
    .spyOn(AddressBookController.prototype, 'getAddressBook')
    .mockReturnThis();
  const updateAddressBookSpy: jest.SpyInstance = jest
    .spyOn(AddressBookController.prototype, 'updateAddressBook')
    .mockReturnThis();
  const deleteAddressBookSpy: jest.SpyInstance = jest
    .spyOn(AddressBookController.prototype, 'deleteAddressBook')
    .mockReturnThis();

  it('construct', () => {
    expect(addressBookRoute).toBeInstanceOf(AddressBookRoute);
  });

  it('define', () => {
    addressBookRoute.define();
    expect(postSpy).toBeCalled();
    expect(getSpy).toBeCalled();
    expect(patchSpy).toBeCalled();
    expect(deleteSpy).toBeCalled();
  });

  it('define', () => {
    addressBookRoute.define();
    expect(postSpy).toBeCalled();
    expect(getSpy).toBeCalled();
    expect(patchSpy).toBeCalled();
    expect(deleteSpy).toBeCalled();
  });

  it('createAddressBook', () => {
    addressBookRoute.createAddressBook(expect.anything(), expect.anything());
    expect(createAddressBookSpy).toBeCalled();
  });
  it('getAddressBookByEmail', () => {
    addressBookRoute.getAddressBookByEmail(expect.anything(), expect.anything());
    expect(getAddressBookByEmailSpy).toBeCalled();
  });

  it('getAddressBook', () => {
    addressBookRoute.getAddressBook(expect.anything(), expect.anything());
    expect(getAddressBookSpy).toBeCalled();
  });

  it('updateAddressBook', () => {
    addressBookRoute.updateAddressBook(expect.anything(), expect.anything());
    expect(updateAddressBookSpy).toBeCalled();
  });

  it('deleteAddressBook', () => {
    addressBookRoute.deleteAddressBook(expect.anything(), expect.anything());
    expect(deleteAddressBookSpy).toBeCalled();
  });

  it('getRouter', () => {
    const router = addressBookRoute.getRouter();
    expect(router.name).toMatch(Router.name);
  });
});
