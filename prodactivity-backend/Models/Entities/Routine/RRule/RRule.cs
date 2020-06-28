using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace prodactivity
{
    /// <summary>
    /// A rule defining a recurring event
    /// Documentation: https://dateutil.readthedocs.io/en/stable/rrule.html
    /// </summary>
    public class RRule
    {
        /// <summary>The start date for this rule</summary>
        public DateTime DTStart { get; set; }

        /// <summary>The frequency to apply this rule. Ex: Daily, Weekly, etc.</summary>
        public string Freq { get; set; }

        /// <summary>The interval of frequency. Ex: If Freq=Weekly, then interval=2 is every other week</summary>
        public int Interval { get; set; }

        /// <summary>The months that apply to this rule. Ex: [1, 3, 5] = January, March, May</summary>
        public List<int> ByMonth { get; set; }

        /// <summary>The days of the month this rule applies to. Ex: [3, 6] = the third and sixth of a month</summary>
        public List<int> ByMonthDay { get; set; }

        /// <summary>The weekdays this rule applies to. Ex: [1, 2, 4] = Sunday, Monday, Wednesday</summary>
        public List<int> ByWeekday { get; set; }
    }
}
