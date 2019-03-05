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

namespace DnnFree.Modules.SPA.React.Services
{
    public class ResumeController : DnnApiController
    {
        public string ResumeTemplate(Resume model)
        {
            string templatePath = $@"{PortalSettings.HomeDirectoryMapPath}\Templates";

            IRazorLightEngine engine = EngineFactory.CreatePhysical(templatePath);
            var templateFile = "resume.cshtml";
            string result = engine.Parse(templateFile, model);

            return result;
        }


        [AllowAnonymous]
        [HttpGet]
        public HttpResponseMessage Stream(string uid)
        {
            var filePath = $@"{PortalSettings.HomeDirectoryMapPath}PDF\{uid}.pdf";
            var dataBytes = File.ReadAllBytes(filePath);
            var dataStream = new MemoryStream(dataBytes);

            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(dataStream);
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Resume.pdf";
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return httpResponseMessage;
        }

        // GET: Resume
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Save([FromBody]Resume res)
        {
            var resumeHtml = ResumeTemplate(res);

            var Renderer = new HtmlToPdf();
            var PDF = Renderer.RenderHtmlAsPdf(resumeHtml);
            var uid = DateTime.Now.Ticks;
            var OutputPath = $@"{PortalSettings.HomeDirectoryMapPath}PDF\{uid}.pdf";
            var success = PDF.TrySaveAs(OutputPath);

            if (success)
            {
                return Request.CreateResponse(HttpStatusCode.OK, $@"https://portal.virtualcareersystem.com/DesktopModules/ResumeBuilder/API/Resume/Stream?uid={uid}");
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
            string body = "<p>Thanks!</p>";

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