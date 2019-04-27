using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DnnFree.Modules.SPA.React.Models;
using Newtonsoft.Json;

namespace DnnFree.Modules.SPA.React.Services.ViewModels
{
    [JsonObject(MemberSerialization.OptIn)]
    public class ResumeViewModel
    {
        public ResumeViewModel(Resume res)
        {
            Id = res.ResumeId;
            Name = res.Name;
            CurrentPosition = res.CurrentPosition;
            Location = res.Location;
            Summary = res.Summary;
            Email = res.Email;
            //Description = res.ItemDescription;
            //AssignedUser = res.AssignedUserId;
        }



        //public ResumeViewModel(Resume res, string editUrl)
        //{
        //    Id = res.ResumeId;
        //    Name = res.ResumeName;
        //    Description = t.ItemDescription;
        //    EditUrl = editUrl;
        //}


        public ResumeViewModel() { }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("currentPosition")]
        public string CurrentPosition { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("sendAddress")]
        public string SendAddress { get; set; }

        [JsonProperty("color")]
        public string Color { get; set; }

        [JsonProperty("font")]
        public string Font { get; set; }

        [JsonProperty("textSize")]
        public int TextSize { get; set; }

        [JsonProperty("headerSize")]
        public int HeaderSize { get; set; }

        [JsonProperty("template")]
        public string Template { get; set; }

        [JsonProperty("createdOn")]
        public DateTime CreatedOnDate{ get; set; }

        [JsonProperty("lastModified")]
        public DateTime LastModifiedOnDate { get; set; }
    }
}