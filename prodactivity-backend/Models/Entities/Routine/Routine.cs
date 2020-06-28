using System;

namespace prodactivity
{
    public class Routine : UserObject
    {
        public String Name { get; set; }

        public RRule RecurrenceRule { get; set; }
    }
}
