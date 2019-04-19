using System;
using System.Collections.Generic;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Web.Caching;
using System.Linq;
using System.Web;

namespace DnnFree.Modules.SPA.React.Models
{
    [TableName("Education")]
    [PrimaryKey("EducationId", AutoIncrement = true)]
    [Scope("ModuleId")]
    [Cacheable("Education", CacheItemPriority.Normal, 20)]
    public class Education
    {
        public string School { get; set; }
        public string Degree { get; set; }
        public string StartYear { get; set; }
        public string EndYear { get; set; }
        public string Location { get; set; }
        public string Achievements { get; set; }
    }
}