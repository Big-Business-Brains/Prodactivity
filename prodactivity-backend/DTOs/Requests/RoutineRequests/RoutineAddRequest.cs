using System;
using System.ComponentModel.DataAnnotations;

namespace prodactivity
{
    public class RoutineAddRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public RRuleDTO RecurrenceRule { get; set; }
    }
}
