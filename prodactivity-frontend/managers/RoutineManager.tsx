import RoutineViewModel from '../models/RoutineViewModel';
import { FetchHelper } from '../helpers';

export default class RoutineManager {

    baseURL = 'http://localhost:5000/routine';

    constructor() {
    }

    /**
     * @returns {RoutineViewModel} ViewModel containing all info for the routine
     */
    async getRoutines(): Promise<RoutineViewModel[] | undefined> {
        try {
            const jsonRoutines = await FetchHelper.get(this.baseURL);

            const routines: RoutineViewModel[] = [];
            for (var routine in jsonRoutines) {
                routines.push(Object.assign(new RoutineViewModel, jsonRoutines[routine]));
            }

            return routines;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    /**
     * @param {string} routineId The ID of the routine to be retrieved
     * @returns {RoutineViewModel} ViewModel containing all info for the routine
     */
    async getRoutine(routineId: string): Promise<RoutineViewModel | undefined> {
        try {
            const routine = await FetchHelper.get(`${this.baseURL}/byroutineid/`, { routineId });
            return Object.assign(new RoutineViewModel, routine);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}