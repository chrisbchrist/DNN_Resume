﻿
using DotNetNuke.Web.Api;
using System.Web.Http;

namespace DnnFree.Modules.SPA.React.Services
{

    /// <summary>
    /// The ServiceRouteMapper tells the DNN Web API Framework what routes this module uses
    /// </summary>
    public class ServiceRouteMapper : IServiceRouteMapper
    {
        /// <summary>
        /// RegisterRoutes is used to register the module's routes
        /// </summary>
        /// <param name="mapRouteManager"></param>
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute(
                moduleFolderName: "ResumeBuilder",
                routeName: "default",
                url: "{controller}/{action}/{resumeId}",
                defaults: new { resumeId = RouteParameter.Optional },
                namespaces: new[] { "DnnFree.Modules.SPA.React.Services" });
        }
    }

}