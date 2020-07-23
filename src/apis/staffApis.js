import { Observable, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import axios from 'axios';
import forOwn from 'lodash/forOwn';
import forEach from 'lodash/forEach';
import isObject from 'lodash/isObject';
import { API_URL } from 'utils/constants';

axios.defaults.withCredentials = true;

export const toFromData = (obj) => {
    const formData = new FormData();
    forOwn(obj, (value, key) => {
        formData.set(key, isObject(value) ? JSON.stringify(value) : value);
    });
    return formData;
};

export const mappingDataFields = (define, list) => {
    const formData = toFromData(define);
    const inputList = Array.isArray(list) ? list : [list];
    console.log(121);
    inputList.forEach((element, idx) => {
        formData.append('__serial__[]', idx);
        forEach(element, (value, key) => {
            formData.append(`${key}[]`, Array.isArray(value) ? JSON.stringify(value) : value);
        });
    });
    return formData;
};

export const login = (data) => from(axios.post(`${API_URL}/api/login`, toFromData(data)));

export const getUserDefinition = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'define' })));

export const getAllUsers = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'data' })));

export const getAllUsers1 = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'delete' })));

// export const login = (data) => Observable.fromPromise(axios.post('http://myslim.nlsoft.vn/api/login', data));

export const fetchTableDefinition = (api) => from(axios.post(api, toFromData({ __action__: 'define' })));

export const fetchTableData = ({ api, ...rest }) =>
    from(axios.post(api, toFromData({ __action__: 'data', ...rest })));

export const updateTableRow = (api, data) => {
    return from(axios.post(api, mappingDataFields({ __action__: 'update' }, data)));
};

export const deleteTableRow = (api, data) => from(axios.post(api, mappingDataFields({ __action__: 'delete' }, data)));

export const addTableRow = (api, data) => from(axios.post(api, mappingDataFields({ __action__: 'insert' }, data)));

export const searchInTable = (api, data) => from(axios.post(api, toFromData({ __action__: 'data', ...data })));

export const saveVisibleColumns = (api, data) => from(axios.post(api, toFromData({ __action__: 'setting', ...data })));

export const sortColumn = (api, data) => from(axios.post(api, toFromData({ __action__: 'data', ...data })));

export default {
    login,
    getUserDefinition,
    getAllUsers,
    saveVisibleColumns,
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    addTableRow,
    searchInTable,
    sortColumn,
};
