import { Router, Request, Response } from 'express';
import { AddressBookController } from '@controllers';
import Middleware from './Middleware';

export class AddressBookRoute {
  public router: Router;

  public addressBookController: AddressBookController;

  public validatorSchema;

  constructor() {
    this.router = Router();
    this.addressBookController = new AddressBookController();
    this.validatorSchema = this.addressBookController.getValidatorSchema();
    this.define();
  }

  public define(): void {
    const middlewarePost = new Middleware(this.validatorSchema.create);
    this.router.post('/address-book', middlewarePost.apply.bind(middlewarePost), this.createAddressBook.bind(this));

    const middlewareGet = new Middleware(this.validatorSchema.read);
    this.router.get(
      '/address-book/:email',
      middlewarePost.apply.bind(middlewareGet),
      this.getAddressBookByEmail.bind(this),
    );

    this.router.get('/address-book', this.getAddressBook.bind(this));

    const middlewarePatch = new Middleware(this.validatorSchema.update);
    this.router.patch(
      '/address-book/:email',
      middlewarePost.apply.bind(middlewarePatch),
      this.updateAddressBook.bind(this),
    );

    const middlewareDelete = new Middleware(this.validatorSchema.delete);
    this.router.delete(
      '/address-book/:email',
      middlewareDelete.apply.bind(middlewareDelete),
      this.deleteAddressBook.bind(this),
    );
  }

  public createAddressBook(req: Request, res: Response): void {
    this.addressBookController.createAddressBook(req, res);
  }

  public getAddressBookByEmail(req: Request, res: Response): void {
    this.addressBookController.getAddressBookByEmail(req, res);
  }

  public getAddressBook(req: Request, res: Response): void {
    this.addressBookController.getAddressBook(res);
  }

  public updateAddressBook(req: Request, res: Response): void {
    this.addressBookController.updateAddressBook(req, res);
  }

  public deleteAddressBook(req: Request, res: Response): void {
    this.addressBookController.deleteAddressBook(req, res);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AddressBookRoute;
