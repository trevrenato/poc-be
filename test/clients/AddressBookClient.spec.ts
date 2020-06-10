import { Sequelize } from 'sequelize-typescript';

import { AddressBookClient } from '../../src/clients';

describe('AddressBookClient', () => {
  const sequelize = new Sequelize({
    validateOnly: true,
  });
  sequelize.addModels([AddressBookClient]);
  const addressBookClient = new AddressBookClient();

  it('properties', () => {
    ['id', 'firstName', 'lastName', 'email', 'phone', 'created_at', 'updated_at'].forEach((propName) =>
      expect(addressBookClient).toHaveProperty(propName),
    );
  });
});
