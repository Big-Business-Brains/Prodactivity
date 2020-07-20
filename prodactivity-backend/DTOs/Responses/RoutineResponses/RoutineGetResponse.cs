using System;

namespace prodactivity
{
    public class RoutineGetResponse
    {
        public Guid Id { get; set; }

        public String Name { get; set; }

        public RRuleDTO RecurrenceRule { get; set; }
    }
}
