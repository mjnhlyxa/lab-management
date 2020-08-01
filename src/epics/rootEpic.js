import { combineEpics } from 'redux-observable';
import loginEpic from 'epics/loginEpic';
import tableEpic from 'epics/tableEpic';
import userEpic from 'epics/userEpic';

const epics = [loginEpic, tableEpic, userEpic].filter(Boolean);

const rootEpic = combineEpics(...epics);

export default rootEpic;
