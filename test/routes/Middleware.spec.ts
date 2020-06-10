import Joi, { ObjectSchema } from '@hapi/joi';
import { Middleware } from '../../src/routes/Middleware';

describe('Middleware', () => {
  let schema: unknown;

  it('construct', () => {
    schema = {
      testObject: Joi.object({
        testString: Joi.string().required(),
        testEmail: Joi.string().email().required(),
      }),
    };
    const middleware = new Middleware(schema);
    expect(middleware).toBeInstanceOf(Middleware);
  });
});
