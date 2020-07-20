using System;

namespace prodactivity
{
    public class RoutineInstance : UserObject
    {
        /// <summary>
        /// The id for the parent routine
        /// </summary>
        public Guid RoutineId { get; set; }

        /// <summary>
        /// The date the routine is due
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// Whether the routine was completed successfully
        /// </summary>
        public bool Completed { get; set; }
    }
}
