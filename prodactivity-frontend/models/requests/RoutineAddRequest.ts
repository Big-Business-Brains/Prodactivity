import RRuleDTO from '../RRuleDTO';

export interface RoutineAddRequest {
    name: string;
    recurrenceRule: RRuleDTO;
}
