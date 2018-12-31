
import { combineEpics } from "redux-observable";
import initPlayers from "./initPlayers";

const epics = combineEpics(
    initPlayers,
);

export default epics;