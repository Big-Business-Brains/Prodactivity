using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace prodactivity
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Routine> Routines { get; set; }
        public DbSet<RoutineInstance> RoutineInstances { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new RoutineEntityConfiguration());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Filename=prodactivity.db");
    }
}