import RRuleDTO from './RRuleDTO';

export default class RoutineDTO {
    id: string;
    name: string;
    recurrenceRule: RRuleDTO;

    /**
     * @param {string} name Name of the routine
     */
    constructor(id: string, name: string, recurrenceRule: RRuleDTO) {
        this.id = id;
        this.name = name;
        this.recurrenceRule = recurrenceRule;
    }
}
