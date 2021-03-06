// export const API_URL = 'https://test-webview-sa.herokuapp.com';
// export const API_URL = 'http://myslim.nlsoft.vn';
export const API_URL = 'http://cenlab.nlsoft.vn';

export const FIELD_TYPE = {
    STRING: 0,
    FLOAT: 1,
    INT: 2,
    TEXT: 3,
    BOOLEAN: 4,
    DATE: 5,
    TIME: 6,
    DATETIME: 7,
    FILE: 8,
    PASSWORD: 9,
};

export const RESPONSE_STATE = {
    WAITING: 0,
    SUCCESSS: 1,
    FAILED: -1,
};

export const LANGUAGE_SUPPORTED = {
    ENG: 'en',
    VIE: 'vi',
};

export const FILTER_ID = {
    EQUAL: 0,
    NOT_EQUAL: 1,
    IN: 2,
    NOT_IN: 3,
    CONTAIN: 4,
    START_WITH: 5,
    END_WITH: 6,
    BETWEEN: 7,
    NOT_BETWEEN: 8,
};

export const SORT_TYPE = {
    ESC: 0,
    DES: 1,
};

export const MODAL_ID = {
    CREATE_TABLE_DATA_MODAL: 'CREATE_TABLE_DATA_MODAL',
    CHANGE_PASSWORD_MODAL: 'CHANGE_PASSWORD_MODAL',
};
