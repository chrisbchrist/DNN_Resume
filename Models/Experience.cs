using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DnnFree.Modules.SPA.React.Models
{
    public class Experience
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string[] DescList { get; set; }
    }
}