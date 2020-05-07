import RoutineViewModel from '../models/RoutineViewModel';

export default class RoutineManager {

    baseURL = 'http://localhost:5000/routine';

    constructor() {
    }

    /**
     * @param {string} routineId The ID of the routine to be retrieved
     * @returns {RoutineViewModel} ViewModel containing all info for the routine
     */
    async getRoutine(routineId) {
        try {
            let response = await fetch(`${this.baseURL}?routineId=${routineId}`);
            let routine = await response.json();
            return Object.assign(new RoutineViewModel, routine);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}