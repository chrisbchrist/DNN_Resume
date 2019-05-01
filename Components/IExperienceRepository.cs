using System;
using System.Collections.Generic;
using System.Linq;
using DnnFree.Modules.SPA.React.Models;
using DotNetNuke.Collections;
using System.Web;
using System.Web.Mvc;

namespace DnnFree.Modules.SPA.React.Components
{
    public interface IExperienceRepository
    {

        int AddExperience(Experience exp);

        //void DeleteExperience(int ExperienceId, int moduleId);

        void DeleteExperience(int ExperienceId);

        void DeleteExperience(Experience exp);

        Experience GetExperience(int ExperienceId);

        //IQueryable<Experience> GetExperiences(int moduleId);

        IQueryable<Experience> GetExperiences();

        void UpdateExperience(Experience exp);
    }
}
}
