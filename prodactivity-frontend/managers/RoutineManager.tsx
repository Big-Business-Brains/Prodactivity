import { RoutineDTO, RoutineAddRequest } from '../models/';
import FetchHelper from '../helpers';

export default class RoutineManager {
    baseURL = 'http://localhost:5000/routine';

    constructor() {}

    /**
     * @returns {Result<RoutineDTO[]>} Result with view model containing all info for the routine
     */
    getRoutines = async (): Promise<Result<RoutineDTO[]>> => {
        return await FetchHelper.get<RoutineDTO[]>(this.baseURL);
    };

    /**
     * @param {string} routineId The ID of the routine to be retrieved
     * @returns {Result<RoutineDTO>} ViewModel containing all info for the routine
     */
    getRoutine = async (routineId: string): Promise<Result<RoutineDTO>> => {
        return await FetchHelper.get<RoutineDTO>(`${this.baseURL}/byroutineid/`, { routineId });
    };

    /**
     * @param {string} routineId The ID of the routine to be retrieved
     * @returns {Result<RoutineDTO>} ViewModel containing all info for the routine
     */
    addRoutine = async (routineAddRequest: RoutineAddRequest): Promise<Result<boolean>> => {
        const response = await FetchHelper.post<{}>(this.baseURL, routineAddRequest);
        return {
            result: response.message === undefined,
            message: response.message,
        };
    };
}
