import { combineEpics } from 'redux-observable';
import loginEpic from 'epics/loginEpic';

const epics = [loginEpic].filter(Boolean);

const rootEpic = combineEpics(...epics);

export default rootEpic;
