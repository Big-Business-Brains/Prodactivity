using System;
using System.Collections.Generic;

namespace prodactivity
{
    public class RRuleDTO
    {
        public DateTime DTStart { get; set; }

        public string Freq { get; set; }

        public int Interval { get; set; }

        public List<int> ByMonth { get; set; }

        public List<int> ByMonthDay { get; set; }

        public List<int> ByWeekday { get; set; }
    }
}
