using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Linq;
using Newtonsoft.Json;

namespace prodactivity
{
    class RoutineEntityConfiguration : IEntityTypeConfiguration<Routine>
    {
        public void Configure(EntityTypeBuilder<Routine> routineConfiguration)
        {
            // serialize the RRule object to JSON string for storing in database
            routineConfiguration.Property(m => m.RecurrenceRule).HasConversion(m => JsonConvert.SerializeObject(m), m => JsonConvert.DeserializeObject<RRule>(m));
        }
    }
}