import { Observable, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import axios from 'axios';
import forOwn from 'lodash/forOwn';
import forEach from 'lodash/forEach';
import isObject from 'lodash/isObject';

axios.defaults.withCredentials = true;

export const toFromData = (obj) => {
    const formData = new FormData();
    forOwn(obj, (value, key) => {
        formData.set(key, isObject(value) ? JSON.stringify(value) : value);
    });
    return formData;
};

export const mappingDataField = (data) => {
    const result = {
        '__serial__[]': 1,
    };
    forEach(data, (value, key) => {
        result[`${key}[]`] = Array.isArray(value) ? JSON.stringify(value) : value;
    });
    return result;
};

export const login = (data) => from(axios.post('http://myslim.nlsoft.vn/api/login', toFromData(data)));

export const getUserDefinition = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'define' })));

export const getAllUsers = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'data' })));

export const getAllUsers1 = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'delete' })));

// export const login = (data) => Observable.fromPromise(axios.post('http://myslim.nlsoft.vn/api/login', data));

export const fetchTableDefinition = (api) => from(axios.post(api, toFromData({ __action__: 'define' })));

export const fetchTableData = (api) => from(axios.post(api, toFromData({ __action__: 'data' })));

export const updateTableRow = (api, data) => {
    return from(axios.post(api, toFromData({ __action__: 'update', ...mappingDataField(data) })));
};

export const deleteTableRow = (api, data) =>
    from(axios.post(api, toFromData({ __action__: 'delete', ...mappingDataField(data) })));

export const addTableRow = (api, data) =>
    from(axios.post(api, toFromData({ __action__: 'insert', ...mappingDataField(data) })));

export const searchInTable = (api, data) => from(axios.post(api, toFromData({ __action__: 'data', ...data })));

export default {
    login,
    getUserDefinition,
    getAllUsers,

    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    addTableRow,
    searchInTable,
};
