import Joi, { Schema } from '@hapi/joi';

import { Request, Response } from 'express';
import { AddressBookUseCase } from '@use-cases';
import { AddressBookEntity } from '@entities';

export class AddressBookController {
  constructor(private readonly addressBookUseCase = new AddressBookUseCase()) {}

  public async createAddressBook(req: Request, res: Response): Promise<Response> {
    const addressBookEntity: AddressBookEntity = new AddressBookEntity({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
    });

    const addressBook = await this.addressBookUseCase.getAddressBookByEmail(addressBookEntity);
    if (!addressBook) {
      return this.addressBookUseCase
        .createAddressBook(addressBookEntity)
        .then((addressBook) => {
          res.location(`/v1/address-book/${addressBook.email}`);
          return res.json(addressBook);
        })
        .catch((error) => res.status(500).json(error));
    } else {
      return res.sendStatus(409);
    }
  }

  public getAddressBook(res: Response): Promise<Response> {
    return this.addressBookUseCase
      .getAddressBook()
      .then((addressesBook) => res.json(addressesBook))
      .catch((error) => res.status(500).json(error));
  }

  public getAddressBookByEmail(req: Request, res: Response): Promise<Response> {
    const addressBookEntity: AddressBookEntity = new AddressBookEntity({
      firstName: undefined,
      lastName: undefined,
      email: req.params.email.toLowerCase(),
      phone: undefined,
    });

    return this.addressBookUseCase
      .getAddressBookByEmail(addressBookEntity)
      .then((addressBook) => res.json(addressBook || {}))
      .catch((error) => res.status(500).json(error));
  }

  public async updateAddressBook(req: Request, res: Response): Promise<Response> {
    const addressBookEntity: AddressBookEntity = new AddressBookEntity({
      firstName: undefined,
      lastName: undefined,
      email: req.params.email.toLowerCase(),
      phone: undefined,
    });
    const addressBook = await this.addressBookUseCase.getAddressBookByEmail(addressBookEntity);
    if (addressBook) {
      const newAddressBookEntity: AddressBookEntity = new AddressBookEntity({
        firstName: req.body.firstName || addressBook.firstName,
        lastName: req.body.lastName || addressBook.lastName,
        email: (req.body.email || addressBook.email).toLowerCase(),
        phone: req.body.phone || addressBook.phone,
      });

      return this.addressBookUseCase
        .updateAddressBook(addressBookEntity, newAddressBookEntity)
        .then((success) => res.json(success))
        .catch((error) => res.status(500).json(error));
    }

    return res.sendStatus(404);
  }

  public async deleteAddressBook(req: Request, res: Response): Promise<Response> {
    const addressBookEntity: AddressBookEntity = new AddressBookEntity({
      firstName: undefined,
      lastName: undefined,
      email: req.params.email.toLowerCase(),
      phone: undefined,
    });

    const addressBook = await this.addressBookUseCase.getAddressBookByEmail(addressBookEntity);
    if (addressBook) {
      return this.addressBookUseCase
        .deleteAddressBook(addressBookEntity)
        .then(() => res.sendStatus(202))
        .catch((error) => res.status(500).json(error));
    }

    return res.sendStatus(404);
  }

  public getValidatorSchema(): { create: Schema; read: Schema; update: Schema; delete: Schema } {
    return {
      create: Joi.object({
        firstName: Joi.string().required(),
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
  }
}
