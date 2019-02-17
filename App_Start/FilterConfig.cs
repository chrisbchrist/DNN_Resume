using System.Web;
using System.Web.Mvc;

namespace DnnFree.Modules.SPA.React
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
