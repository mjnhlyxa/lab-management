import { Observable, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import axios from 'axios';
import forOwn from 'lodash/forOwn';

export const toFromData = (obj) => {
    const formData = new FormData();
    forOwn(obj, (value, key) => {
        formData.set(key, value);
    });
    return formData;
};

export const login = (data) =>
    from(axios.post("http://myslim.nlsoft.vn/api/login", toFromData(data), {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }));

export const getStaff = ({ response, saId }) =>
    Observable.fromPromise(
        axios.post('', {
            response,
            saId,
        }),
    );

export default {
    login,
    getStaff,
};
