import { Router } from 'express';
import AddressBookRoute from './AddressBookRoute';

const router = Router();
router.use('/v1', new AddressBookRoute().getRouter());

export default router;
