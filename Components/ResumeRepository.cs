using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using DnnFree.Modules.SPA.React.Models;

namespace DnnFree.Modules.SPA.React.Components
{
    public class ResumeRepository : ServiceLocator<IResumeRepository, ResumeRepository>, IResumeRepository
    {

        protected override Func<IResumeRepository> GetFactory()
        {
            return () => new ResumeRepository();
        }

        public int AddResume(Resume t)
        {
            Requires.NotNull(t);
            Requires.PropertyNotNegative(t, "ModuleId");

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();
                rep.Insert(t);
            }
            return int.Parse(t.ResumeId);
        }

        public void DeleteResume(Resume t)
        {
            Requires.NotNull(t);
            Requires.PropertyNotNegative(t, "ResumeId");

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();
                rep.Delete(t);
            }
        }

        public void DeleteResume(int ResumeId, int moduleId)
        {
            Requires.NotNegative("ResumeId", ResumeId);
            Requires.NotNegative("moduleId", moduleId);

            var t = GetResume(ResumeId, moduleId);
            DeleteResume(t);
        }

        public Resume GetResume(int ResumeId, int moduleId)
        {
            Requires.NotNegative("ResumeId", ResumeId);
            Requires.NotNegative("moduleId", moduleId);

            Resume t;
            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();
                t = rep.GetById(ResumeId, moduleId);
            }
            return t;
        }

        public IQueryable<Resume> GetResumes(int moduleId)
        {
            Requires.NotNegative("moduleId", moduleId);

            IQueryable<Resume> t = null;

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();

                t = rep.Get(moduleId).AsQueryable();
            }

            return t;
        }

        //public IPagedList<Resume> GetResumes(string searchTerm, int moduleId, int pageIndex, int pageSize)
        //{
        //    Requires.NotNegative("moduleId", moduleId);

        //    var t = GetResumes(moduleId).Where(c => c.ResumeName.Contains(searchTerm)
        //                                        || c.ResumeDescription.Contains(searchTerm));


        //    return new PagedList<Resume>(t, pageIndex, pageSize);
        //}

        public void UpdateResume(Resume t)
        {
            Requires.NotNull(t);
            Requires.PropertyNotNegative(t, "ResumeId");

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();
                rep.Update(t);
            }
        }
    }
}
