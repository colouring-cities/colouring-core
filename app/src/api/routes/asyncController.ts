import { NextFunction, Request, Response } from 'express';

/**
 * A wrapper for controller functions that return a Promise, enabling them to be used with Express
 * Without this wrapper, Promise rejections caused by an error in the controller will not be passed properly
 * to subsequent middleware layers.
 * @param fn the async controller function to be wrapped
 * @returns controller function which handles async errors correctly
 */
function asyncController(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
}

export default asyncController;
