import { ITask } from 'pg-promise';
import format from 'pg-format';

import db from '../../db';
import { DatabaseError } from '../errors/general';
import { AggregationMethod } from '../config/aggregationsConfig';

export type AggregationMethodFunction = (buildingId: number, attributeName: string, t?: ITask<any>) => Promise<number>;

export async function aggregateCountTrue(buildingId: number, attributeName: string, t?: ITask<any>): Promise<number> {
    try {
        // use pg-format here instead of pg-promise parameterised queries as they don't support column name from parameter
        // assume that there won't be more likes than Postgres int range and cast to int
        // otherwise the count is returned as a bigint which has less support in node-postgres
        const query = format(`SELECT count(*)::int as agg FROM building_user_attributes WHERE building_id = %L::int AND %I = true;`, buildingId, attributeName);
        const { agg } = await (t || db).one(query);

        return agg;
    } catch(error) {
        throw new DatabaseError(error);
    }
}

export const aggregationMethods: Record<AggregationMethod, AggregationMethodFunction> = {
    'countTrue': aggregateCountTrue
};