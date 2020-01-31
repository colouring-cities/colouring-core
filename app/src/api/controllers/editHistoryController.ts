import express from 'express';

import { UserInputError } from '../errors';
import { checkRegexParam, parsePositiveIntParam, processParam } from '../parameters';
import asyncController from "../routes/asyncController";
import * as editHistoryService from '../services/editHistory';

const getGlobalEditHistory = asyncController(async (req: express.Request, res: express.Response) => {

    const revisionIdRegex = /^[1-9]\d*$/;
    const afterId: string = processParam(req.query, 'after_id', x => checkRegexParam(x, revisionIdRegex));
    const beforeId: string = processParam(req.query, 'before_id', x => checkRegexParam(x, revisionIdRegex));
    const count: number = processParam(req.query, 'count', parsePositiveIntParam);

    if(afterId != undefined && beforeId != undefined) {
        throw new UserInputError('Cannot specify both after_id and before_id parameters');
    }

    try {
        const result = await editHistoryService.getGlobalEditHistory(beforeId, afterId, count);
        res.send(result);
    } catch(error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

export {
    getGlobalEditHistory
};
