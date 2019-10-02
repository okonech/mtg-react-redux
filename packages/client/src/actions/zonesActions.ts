import { ActionType, createStandardAction } from 'typesafe-actions';
import { Zone } from '../reducers/zonesReducer';

export const addZones = createStandardAction('zones/ADD')<Zone[]>();
export const updateZones = createStandardAction('zones/UPDATE')<Zone[]>();
export const deleteZones = createStandardAction('zones/DELETE')<string[]>();

export type ZonesAction = ActionType<typeof addZones> | ActionType<typeof updateZones> | ActionType<typeof deleteZones>;

