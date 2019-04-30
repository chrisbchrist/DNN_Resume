using System;
using System.Collections.Generic;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Web.Caching;
using System.Linq;
using System.Web;

namespace DnnFree.Modules.SPA.React.Models
{
    [TableName("Resume_Builder_Resumes")]
    [PrimaryKey("ResumeId", AutoIncrement = true)]
    [Cacheable("Resume_Builder_Resumes", CacheItemPriority.Normal, 20)]
    public class Resume
    {
        public int ResumeId { get; set; }
        public string ResumeName { get; set; }
        public string Name { get; set; }
        public string CurrentPosition { get; set; }
        public string Location { get; set; }
        public string Summary { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        [IgnoreColumn]
        public List<Experience> Experience { get; set; } = new List<Experience>();

        [IgnoreColumn]
        public List<Education> Education { get; set; } = new List<Education>();

        [IgnoreColumn]
        public List<string> Skills { get; set; } = new List<string>();

        public string SendAddress { get; set; }
        public string Color { get; set; }
        public string Font { get; set; }
        public int TextSize { get; set; }
        public int HeaderSize { get; set; }
        public string Template { get; set; }
        public DateTime CreatedOnDate { get; set; }
        public DateTime LastModifiedOnDate { get; set; }
    }
}