import RoutineViewModel from '../models/RoutineViewModel';

export default class RoutineManager {

    baseURL = 'http://localhost:5000/routine';

    constructor() {
    }

    /**
     * @returns {RoutineViewModel} ViewModel containing all info for the routine
     */
    async getRoutines(): Promise<RoutineViewModel[] | undefined> {
        try {
            let response = await fetch(`${this.baseURL}`);
            let jsonRoutines = await response.json();
            
            var routines: RoutineViewModel[] = [];
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
            let response = await fetch(`${this.baseURL}/byroutineid/?routineId=${routineId}`);
            let routine = await response.json();
            return Object.assign(new RoutineViewModel, routine);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}