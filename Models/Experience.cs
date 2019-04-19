using System;
using System.Collections.Generic;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Web.Caching;
using System.Linq;
using System.Web;

namespace DnnFree.Modules.SPA.React.Models
{
    [TableName("Experience")]
    [PrimaryKey("ExperienceId", AutoIncrement = true)]
    [Scope("ModuleId")]
    [Cacheable("Experience", CacheItemPriority.Normal, 20)]
    public class Experience
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string[] DescList { get; set; }
        public bool ListFormat { get; set; }
    }
}