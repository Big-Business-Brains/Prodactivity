using System;
using System.ComponentModel.DataAnnotations;

namespace prodactivity
{
    public class RoutineCompletionRequest
    {
        /// <summary>
        /// Id for the routine instance to update
        /// </summary>
        /// <value>If null, a new routine instance will be created</value>
        public Guid? RoutineInstanceId { get; set; }

        /// <summary>
        /// Id for the parent routine object
        /// </summary>
        public Guid RoutineId { get; set; }

        /// <summary>
        /// The date this routine instance was completed
        /// </summary>
        [Required]
        public DateTime Date { get; set; }

        /// <summary>
        /// Whether the user completed this routine instance
        /// </summary>
        [Required]
        public bool Completed { get; set; }
    }
}
