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

        //void DeleteResume(int resumeId, int moduleId);

        void DeleteResume(int resumeId);

        void DeleteResume(Resume res);

        Resume GetResume(int resumeId);

        //IQueryable<Resume> GetResumes(int moduleId);

        IQueryable<Resume> GetResumes();

        void UpdateResume(Resume res);
    }
}