import { Request, Response } from 'express';
import Joi from '@hapi/joi';
import { AddressBookController } from '../../src/controllers';
import { AddressBookUseCase } from '../../src/use-cases';
import { matchersWithOptions } from 'jest-json-schema';

describe('AddressBookController', () => {
  const addressBookController = new AddressBookController();
  const createAddressBookUseCaseSpy: jest.SpyInstance = jest.spyOn(AddressBookUseCase.prototype, 'createAddressBook');
  const getAddressBookUseCaseSpy: jest.SpyInstance = jest.spyOn(AddressBookUseCase.prototype, 'getAddressBook');
  const getAddressBookByEmailUseCaseSpy: jest.SpyInstance = jest.spyOn(
    AddressBookUseCase.prototype,
    'getAddressBookByEmail',
  );
  const updateAddressBookUseCaseSpy: jest.SpyInstance = jest.spyOn(AddressBookUseCase.prototype, 'updateAddressBook');
  const deleteAddressBookUseCaseSpy: jest.SpyInstance = jest.spyOn(AddressBookUseCase.prototype, 'deleteAddressBook');
  const mockAddressBook = {
    firstName: 'Batman Mock',
    lastName: 'Wayne Mock',
    email: 'batman@wayne.com',
    phone: '5551234',
  };
  const mockRequest = ({
    body: {
      ...mockAddressBook,
    },
    params: {
      email: 'batman@wayne.com',
    },
  } as unknown) as Request;
  const mockResponse = ({
    sendStatus: jest.fn(),
    json: jest.fn(),
    location: jest.fn(),
  } as unknown) as Response;
  
  jest.spyOn(global.console, 'warn');
  const expectedValidatorSchema = {
    create: Joi.object({
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    }),
    read: Joi.object({
      email: Joi.string().email(),
    }),
    update: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email().required(),
      phone: Joi.string(),
    }),
    delete: Joi.object({
      email: Joi.string().email().required(),
    }),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('createAddressBook', async () => {
    createAddressBookUseCaseSpy.mockReturnValue(Promise.resolve(mockAddressBook));

    await addressBookController.createAddressBook(mockRequest, mockResponse);
    expect(createAddressBookUseCaseSpy).toBeCalled();
  });

  it('createAddressBook:catch', async () => {
    createAddressBookUseCaseSpy.mockReturnValue(Promise.reject());
    await addressBookController.createAddressBook(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(409);
  });

  it('createAddressBook:addressBook duplicated', async () => {
    getAddressBookByEmailUseCaseSpy.mockReturnValue(mockAddressBook);
    await addressBookController.createAddressBook(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(409);
  });

  it('getAddressBook', async () => {
    getAddressBookUseCaseSpy.mockReturnValue(Promise.resolve(mockAddressBook));

    await addressBookController.getAddressBook(mockResponse);
    expect(getAddressBookUseCaseSpy).toBeCalled();
  });

  it('getAddressBook:catch', async () => {
    getAddressBookUseCaseSpy.mockReturnValue(Promise.reject());
    await addressBookController.getAddressBook(mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(500);
  });

  it('getAddressBookByEmail', async () => {
    getAddressBookByEmailUseCaseSpy.mockReturnValue(Promise.resolve(mockAddressBook));

    await addressBookController.getAddressBookByEmail(mockRequest, mockResponse);
    expect(getAddressBookByEmailUseCaseSpy).toBeCalled();
  });

  it('getAddressBookByEmail:catch', async () => {
    getAddressBookByEmailUseCaseSpy.mockReturnValue(Promise.reject());
    await addressBookController.getAddressBookByEmail(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(500);
  });

  it('updateAddressBook', async () => {
    updateAddressBookUseCaseSpy.mockReturnValue(Promise.resolve(mockAddressBook));

    getAddressBookByEmailUseCaseSpy.mockReturnValue(mockAddressBook);
    await addressBookController.updateAddressBook(mockRequest, mockResponse);
    expect(updateAddressBookUseCaseSpy).toBeCalled();
  });

  it('updateAddressBook:catch', async () => {
    updateAddressBookUseCaseSpy.mockReturnValue(Promise.reject());

    getAddressBookByEmailUseCaseSpy.mockReturnValue(mockAddressBook);
    await addressBookController.updateAddressBook(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(500);
  });

  it('updateAddressBook: addressBook not found', async () => {
    await addressBookController.updateAddressBook(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(404);
  });

  it('deleteAddressBook', async () => {
    deleteAddressBookUseCaseSpy.mockReturnValue(Promise.resolve(mockAddressBook));

    getAddressBookByEmailUseCaseSpy.mockReturnValue(mockAddressBook);
    await addressBookController.deleteAddressBook(mockRequest, mockResponse);
    expect(deleteAddressBookUseCaseSpy).toBeCalled();
  });

  it('deleteAddressBook:catch', async () => {
    deleteAddressBookUseCaseSpy.mockReturnValue(Promise.reject());

    getAddressBookByEmailUseCaseSpy.mockReturnValue(mockAddressBook);
    await addressBookController.deleteAddressBook(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(500);
  });

  it('deleteAddressBook: addressBook not found', async () => {
    await addressBookController.updateAddressBook(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toBeCalledWith(404);
  });

  it('getValidatorSchema', () => {
    expect.extend(
      matchersWithOptions({
        // Loading in a schema which is comprised only of definitions,
        // which means specific test schemas need to be created.
        // This is good for testing specific conditions for definition schemas.
        schemas: [expectedValidatorSchema],
      }),
    );

    const validatorSchema = addressBookController.getValidatorSchema();
    expect(validatorSchema).toBeValidSchema();
  });
});
