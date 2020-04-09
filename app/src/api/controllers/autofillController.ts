import { parseBooleanParam, processParam } from '../parameters';
import asyncController from '../routes/asyncController';
import * as autofillService from '../services/autofill';

const getAutofillOptions = asyncController(async (req, res) => {
    const fieldName = processParam(req.query, 'field_name', x => x, true);
    const { field_value: fieldValue } = req.query;
    const allValues = processParam(req.query, 'all_values', parseBooleanParam);

    const options = await autofillService.getAutofillOptions(fieldName, fieldValue, allValues);

    res.send({ options: options });
});

export default {
    getAutofillOptions
};
