import { combineEpics } from 'redux-observable';
import testEpic from './testEpic';

const epics = [
    testEpic
].filter(Boolean);

const rootEpic = combineEpics(...epics);

export default rootEpic;
