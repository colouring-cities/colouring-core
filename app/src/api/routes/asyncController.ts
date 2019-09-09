import { Request, Response, NextFunction } from 'express';

function asyncController(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
}

export default asyncController;