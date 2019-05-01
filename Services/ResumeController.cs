using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Common;
using DotNetNuke.Web.Api;
using RazorLight;
using IronPdf;
using System.IO;
using DnnFree.Modules.SPA.React.Models;
using DnnFree.Modules.SPA.React.Components;
using DnnFree.Modules.SPA.React.Services.ViewModels;
using System.Net.Http.Headers;

namespace DnnFree.Modules.SPA.React.Services
{
    public class ResumeController : DnnApiController
    {
        private readonly IResumeRepository _repository;

        public ResumeController(IResumeRepository repository)
        {
            Requires.NotNull(repository);

            this._repository = repository;
        }

        public ResumeController() : this(ResumeRepository.Instance) { }

        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Upsert(ResumeViewModel resume)
        {
            if (resume.Id > 0)
            {
                //var res = Update(resume);
                return Request.CreateResponse(System.Net.HttpStatusCode.NoContent);
            }
            else
            {
                var res = Create(resume);
                return Request.CreateResponse(res.ResumeId);
            }

        }

        private Resume Create(ResumeViewModel resume)
        {
            Resume res = new Resume
            {
                Name = resume.Name,
                CurrentPosition = resume.CurrentPosition,
                Location = resume.Location,
                Summary = resume.Summary,
                Email = resume.Email,
                Phone = resume.Phone,
                SendAddress = resume.SendAddress,
                Color = resume.Color,
                Font = resume.Font,
                TextSize = resume.TextSize,
                HeaderSize = resume.HeaderSize,
                Template = resume.Template,
                //AssignedUserId = resume.AssignedUser,
                //ModuleId = ActiveModule.ModuleID,
                //CreatedByUserId = UserInfo.UserID,
                //LastModifiedByUserId = UserInfo.UserID,
                CreatedOnDate = DateTime.UtcNow,
                LastModifiedOnDate = DateTime.UtcNow
            };
            _repository.AddResume(res);

            return res;
        }

        //TODO: Set relevant properties
        //private Resume Update(ResumeViewModel resume)
        //{

        //    var res = _repository.GetResume(resume.Id);
        //    if (res != null)
        //    {
        //        res.ItemName = item.Name;
        //        res.ItemDescription = item.Description;
        //        res.AssignedUserId = item.AssignedUser;
        //        res.LastModifiedByUserId = UserInfo.UserID;
        //        res.LastModifiedOnDate = DateTime.UtcNow;
        //    }
        //    _repository.UpdateResume(res);

        //    return res;
        //}


        public string ResumeTemplate(Resume model)
        {
            string templatePath = $@"{PortalSettings.HomeDirectoryMapPath}\Templates";

            IRazorLightEngine engine = EngineFactory.CreatePhysical(templatePath);
            var templateFile = "resume.cshtml";
            string result = engine.Parse(templateFile, model);

            return result;
        }


        //[AllowAnonymous]
        //[HttpGet]
        //public HttpResponseMessage Stream(string uid)
        //{
        //    var filePath = $@"{PortalSettings.HomeDirectoryMapPath}PDF\{uid}.pdf";
        //    var dataBytes = File.ReadAllBytes(filePath);
        //    var dataStream = new MemoryStream(dataBytes);

        //    HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK);
        //    httpResponseMessage.Content = new StreamContent(dataStream);
        //    httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
        //    httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Resume.pdf";
        //    httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

        //    return httpResponseMessage;
        //}

        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Stream([FromBody]Resume res)
        {
            var resumeHtml = ResumeTemplate(res);

            var Renderer = new HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(resumeHtml);
            MemoryStream stream = PDF.Stream;

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(stream)
            };
            result.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = "WORK.pdf"
                };
           result.Content.Headers.ContentType =
               new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        //[AllowAnonymous]
        //[HttpPost]
        //public HttpResponseMessage Stream([FromBody]Resume res)
        //{
        //    var resumeHtml = ResumeTemplate(res);

        //    var Renderer = new HtmlToPdf();
        //    var PDF = Renderer.RenderHtmlAsPdf(resumeHtml);
        //    var stream = PDF.Stream;

        //    var Response = new HttpResponse(HttpStatusCode.OK);

        //    // or to convert an HTML string
        //    //var PDF = Renderer.RenderHtmlAsPdf("<h1>Hello IronPdf</h1>");
        //    Response.Clear();
        //    Response.ContentType = "application/pdf";
        //    Response.AddHeader("Content-Disposition", "attachment;filename=\"FileName.pdf\"");
        //    // edit this line to display ion browser and change the file name
        //    Response.BinaryWrite(PDF.BinaryData);
        //    Response.Flush();
        //    Response.End();

        //    {
        //        Content = new StreamContent(stream)
        //    };
        //    result.Content.Headers.ContentDisposition =
        //        new ContentDispositionHeaderValue("attachment")
        //        {
        //            FileName = "WORK.pdf"
        //        };
        //    result.Content.Headers.ContentType =
        //        new MediaTypeHeaderValue("application/octet-stream");

        //    return result;
        //}


        // GET: Resume
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Save([FromBody]Resume res)
        {
            var resumeHtml = ResumeTemplate(res);

            var Renderer = new HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(resumeHtml);
            //var uid = DateTime.Now.Ticks;
            var OutputPath = $@"{PortalSettings.HomeDirectoryMapPath}PDF\FUCK.pdf";
            var success = PDF.TrySaveAs(OutputPath);

            if (success)
            {
                return Request.CreateResponse(HttpStatusCode.OK, $@"https://portal.virtualcareersystem.com/DesktopModules/ResumeBuilder/API/Resume/Stream?uid=FUCK");
            }

            return Request.CreateResponse(HttpStatusCode.Ambiguous, $@"File save failure");
        }

        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Email([FromBody]Resume res)
        {
            string fromAddress = PortalSettings.Email;
            string toAddress = res.SendAddress;
            string subject = $"Resumé for {res.Name}";
            string body = "<p>Good luck!</p>";

            if (DotNetNuke.Services.Mail.Mail.IsValidEmailAddress(toAddress, PortalSettings.PortalId))
            {
            var resumeHtml = ResumeTemplate(res);
            var fileName = DateTime.Now.Ticks;
            var portalPath = $@"https://www.virtualcareersystem.com/Portals/5/PDF/{fileName}.pdf";
            var Renderer = new HtmlToPdf();
            MemoryStream stream = Renderer.RenderHtmlAsPdf(resumeHtml).Stream;

            var attachments = new List<System.Net.Mail.Attachment>();
            System.Net.Mime.ContentType ct = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
            System.Net.Mail.Attachment attach = new System.Net.Mail.Attachment(stream, ct);
            attach.ContentDisposition.FileName = "resume.pdf";
            attachments.Add(attach);

            DotNetNuke.Services.Mail.Mail.SendEmail(fromAddress, fromAddress, toAddress, subject, body, attachments);

            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Success");
            return httpResponseMessage;
            } else
            {
                HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.PreconditionFailed, "Invalid e-mail");
                return httpResponseMessage;
            }


        }

    }
}