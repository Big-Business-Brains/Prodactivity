export default class RoutineViewModel {
    name: string;

    /**
     * @param {string} name Name of the routine
     */
    constructor(name?: string) {
        this.name = name || '';
    }
}
