import Joi from '@hapi/joi';
import { Middleware } from '../../src/routes/Middleware';
import { Request, Response } from 'express';

describe('Middleware', () => {
  let schema: unknown;
  let mockRequest = {
    body: {
      testString: 'J',
      testEmail: 'jdoe@abc123.com',
    },
  } as Request;
  const mockResponse = ({
    status: jest.fn().mockReturnValueOnce({
      json: jest.fn(),
    }),
  } as unknown) as Response;
  const mockNext = jest.fn();

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

  it('apply', () => {
    mockRequest = {
      body: {
        testString: 'test string',
        testEmail: 'jdoe@abc123.com',
      },
    } as Request;
    schema = Joi.object({
      testString: Joi.string().required(),
      testEmail: Joi.string().email().required(),
    });
    const middleware = new Middleware(schema);
    middleware.apply(mockRequest, mockResponse, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('apply:error', () => {
    mockRequest = {
      body: {
        testString: '',
        testEmail: 'jdoe@abc123.com',
      },
    } as Request;
    schema = Joi.object({
      testString: Joi.string().required(),
      testEmail: Joi.string().email().required(),
    });
    const middleware = new Middleware(schema);
    middleware.apply(mockRequest, mockResponse, mockNext);
    expect(mockNext).toBeCalled();
  });
});
