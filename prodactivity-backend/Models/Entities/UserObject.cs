using System;

namespace prodactivity
{
    public abstract class UserObject
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
    }
}