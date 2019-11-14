import express from 'express';

import asyncController from "../routes/asyncController";
import * as editHistoryService from '../services/editHistory';

const getGlobalEditHistory = asyncController(async (req: express.Request, res: express.Response) => {
    try {
        const result = await editHistoryService.getGlobalEditHistory();
        res.send(result);
    } catch(error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

export {
    getGlobalEditHistory
};
