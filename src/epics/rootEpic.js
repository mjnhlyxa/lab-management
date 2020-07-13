import { combineEpics } from 'redux-observable';
import loginEpic from 'epics/loginEpic';
import tableEpic from 'epics/tableEpic';

const epics = [loginEpic, tableEpic].filter(Boolean);

const rootEpic = combineEpics(...epics);

export default rootEpic;
