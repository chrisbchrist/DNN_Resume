using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DnnFree.Modules.SPA.React.Models
{
    public class Resume
    {
        public string Name { get; set; }
        public string CurrentPosition { get; set; }
        public string Location { get; set; }
        public string Summary { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Experience> Experience { get; set; } = new List<Experience>();
        public List<Education> Education { get; set; } = new List<Education>();
        public List<string> Skills { get; set; } = new List<string>();
        public string SendAddress { get; set; }
        public string Color { get; set; }
        public string Font { get; set; }
        public int TextSize { get; set; }
        public int HeaderSize { get; set; }
    }
}