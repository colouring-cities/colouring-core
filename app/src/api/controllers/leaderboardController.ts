import express from 'express';

import asyncController from "../routes/asyncController";
import * as leadersService from '../services/leaderboard';

const getLeaders = asyncController(async (req: express.Request, res: express.Response) => {
    try {
        const number_limit = Number(req.query.number_limit);
        const time_limit = Number(req.query.time_limit);
        const result = await leadersService.getLeaders(number_limit, time_limit);
        res.send({
            leaders: result
        });
    } catch(error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

export default{
    getLeaders
};
