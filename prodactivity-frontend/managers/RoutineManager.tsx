import RoutineViewModel from '../models/RoutineViewModel';
import FetchHelper from '../helpers';

export default class RoutineManager {
    baseURL = 'http://localhost:5000/routine';

    constructor() {}

    /**
     * @returns {Result<RoutineViewModel[]>} Result with view model containing all info for the routine
     */
    async getRoutines(): Promise<Result<RoutineViewModel[]>> {
        return await FetchHelper.get<RoutineViewModel[]>(this.baseURL);
    }

    /**
     * @param {string} routineId The ID of the routine to be retrieved
     * @returns {Result<RoutineViewModel>} ViewModel containing all info for the routine
     */
    async getRoutine(routineId: string): Promise<Result<RoutineViewModel>> {
        return await FetchHelper.get<RoutineViewModel>(`${this.baseURL}/byroutineid/`, { routineId });
    }
}
