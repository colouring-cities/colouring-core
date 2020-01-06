import asyncController from '../routes/asyncController';
import * as autofillService from '../services/autofill';

const getAutofillOptions = asyncController(async (req, res) => {
    const { field_name, field_value } = req.query;

    const options = await autofillService.getAutofillOptions(field_name, field_value);

    res.send({ options: options });
});

export default {
    getAutofillOptions
};
