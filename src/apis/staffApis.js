import { Observable, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import axios from 'axios';
import forOwn from 'lodash/forOwn';

axios.defaults.withCredentials = true;

export const toFromData = (obj) => {
    const formData = new FormData();
    forOwn(obj, (value, key) => {
        formData.set(key, value);
    });
    return formData;
};

export const login = (data) => from(axios.post('http://myslim.nlsoft.vn/api/login', toFromData(data)));

export const getUserDefinition = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'define' })));

export const getAllUsers = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'data' })));

export const getAllUsers1 = () =>
    from(axios.post('http://myslim.nlsoft.vn/api/form/user/users', toFromData({ __action__: 'delete' })));

// export const login = (data) => Observable.fromPromise(axios.post('http://myslim.nlsoft.vn/api/login', data));

export default {
    login,
    getUserDefinition,
    getAllUsers,
};
