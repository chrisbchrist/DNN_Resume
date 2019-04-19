using System;
using System.Collections.Generic;
using System.Linq;
using DnnFree.Modules.SPA.React.Models;
using DotNetNuke.Collections;
using System.Web;
using System.Web.Mvc;

namespace DnnFree.Modules.SPA.React.Components
{

    // GET: IResumeRepository
    public interface IResumeRepository
    {

        int AddResume(Resume res);

        void DeleteResume(int resumeId, int moduleId);

        void DeleteResume(Resume res);

        Resume GetResume(int resumeId, int moduleId);

        IQueryable<Resume> GetResumes(int moduleId);

        void UpdateResume(Resume res);
    }
}