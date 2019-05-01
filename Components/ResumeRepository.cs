using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using DnnFree.Modules.SPA.React.Models;
using System.Data.SqlClient;
using System.Data;

namespace DnnFree.Modules.SPA.React.Components
{
    public class ResumeRepository : ServiceLocator<IResumeRepository, ResumeRepository>, IResumeRepository
    {
        //Connection String for DNNDEV
        //Data Source=NUDDIN;Initial Catalog=DNNDev;Integrated Security=True

        protected override Func<IResumeRepository> GetFactory()
        {
            return () => new ResumeRepository();
        }

        public SqlCommand CreateSqlCommand()
        {
            SqlCommand command = new SqlCommand();
            command.CommandTimeout = 15;
            command.CommandType = CommandType.Text;
            return command;
        }

        public int AddResume(Resume res)
        {
            Requires.NotNull(res);
            //Requires.PropertyNotNegative(t, "ModuleId");
            var exp = res.Experience;

            using (IDataContext ctx = DataContext.Instance())
            {
                var command = CreateSqlCommand();
                var commandType = command.CommandType;

                ctx.ExecuteQuery<Experience>(commandType, "SELECT * FROM Resume_Builder_Experience", )

                var rep = ctx.GetRepository<Resume>();
                rep.Insert(res);
            }
            return res.ResumeId;
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

        //public void DeleteResume(int ResumeId, int moduleId)
        //{
        //    Requires.NotNegative("ResumeId", ResumeId);
        //    Requires.NotNegative("moduleId", moduleId);

        //    var t = GetResume(ResumeId, moduleId);
        //    DeleteResume(t);
        //}

        public void DeleteResume(int ResumeId)
        {
            Requires.NotNegative("ResumeId", ResumeId);

            var t = GetResume(ResumeId);
            DeleteResume(t);
        }

        //public Resume GetResume(int ResumeId, int moduleId)
        //{
        //    Requires.NotNegative("ResumeId", ResumeId);
        //    Requires.NotNegative("moduleId", moduleId);

        //    Resume t;
        //    using (IDataContext ctx = DataContext.Instance())
        //    {
        //        var rep = ctx.GetRepository<Resume>();
        //        t = rep.GetById(ResumeId, moduleId);
        //    }
        //    return t;
        //}

        public Resume GetResume(int ResumeId)
        {
            Requires.NotNegative("ResumeId", ResumeId);

            Resume t;
            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();
                t = rep.GetById(ResumeId);
            }
            return t;
        }

        //public IQueryable<Resume> GetResumes(int moduleId)
        //{
        //    Requires.NotNegative("moduleId", moduleId);

        //    IQueryable<Resume> t = null;

        //    using (IDataContext ctx = DataContext.Instance())
        //    {
        //        var rep = ctx.GetRepository<Resume>();

        //        t = rep.Get(moduleId).AsQueryable();
        //    }

        //    return t;
        //}

        public IQueryable<Resume> GetResumes()
        {
            IQueryable<Resume> t = null;

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Resume>();

                t = rep.Get().AsQueryable();
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
