import { Request, Response, NextFunction } from 'express';

export class Middleware {
  private schema;

  constructor(schema: unknown) {
    this.schema = schema;
  }

  public apply(req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate({ ...req.body, ...req.params });

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        error: message,
      });
    } else {
      next();
    }
  }
}

export default Middleware;
