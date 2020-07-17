import express from 'express';

import { ApiParamError, ApiUserError } from '../errors/api';
import { ArgumentError } from '../errors/general';
import { checkRegexParam, parsePositiveIntParam, processParam, parseBooleanParam } from '../parameters';
import asyncController from "../routes/asyncController";
import * as editHistoryService from '../services/editHistory';

const getGlobalEditHistory = asyncController(async (req: express.Request, res: express.Response) => {

    const revisionIdRegex = /^[1-9]\d*$/;
    const afterId: string = processParam(req.query, 'after_id', x => checkRegexParam(x, revisionIdRegex));
    const beforeId: string = processParam(req.query, 'before_id', x => checkRegexParam(x, revisionIdRegex));
    const count: number = processParam(req.query, 'count', parsePositiveIntParam);
    const filterDeletions: boolean = processParam(req.query, 'deletions', parseBooleanParam);

    if(afterId != undefined && beforeId != undefined) {
        throw new ApiUserError('Cannot specify both after_id and before_id parameters');
    }

    try {
        const result = await editHistoryService.getGlobalEditHistory(beforeId, afterId, count, filterDeletions);
        res.send(result);
    } catch(error) {
        if(error instanceof ArgumentError && error.argumentName === 'count') {
            throw new ApiParamError(error.message, error, 'count');
        }

        throw error;
    }
});

export {
    getGlobalEditHistory
};
