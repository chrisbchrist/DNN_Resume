import React from "react";

const CreativeTemplate = props => {
  let profileImage = "";
  if (props.image) {
    profileImage = <img src={props.image} id="profile-image" />;
  } else {
    profileImage = (
      <div className="image-placeholder">
        <i className="fas fa-user-tie" />
      </div>
    );
  }
  return (
    <div
      className="preview preview-creative"
      style={{ fontFamily: props.font, fontSize: props.textSize + "px" }}
    >
      <div className="creative-sidebar" style={{ background: props.color }}>
        <div className="creative-profile">{profileImage}</div>
        <h3 className="creative-name">{props.name}</h3>
        <p className="sidebar-current text-center">{props.currentPosition}</p>
        <p className="sidebar-text text-center">{props.location}</p>
        <p className="sidebar-text">{props.summary}</p>
        {(props.email || props.phone) && (
          <div className="sidebar-contact">
            <h2 className="sidebar-header">Information</h2>
            <div className="sidebar-contact-group">
              <div className="sidebar-icon">
                <i className="fas fa-envelope" />
              </div>{" "}
              {props.email}
            </div>
            <div className="sidebar-contact-group">
              <div className="sidebar-icon">
                <i className="fas fa-mobile-alt" />
              </div>{" "}
              {props.phone}
            </div>
          </div>
        )}
      </div>
      <div className="creative-main">
        {props.skills.length > 0 && (
          <div
            className="creative-header"
            style={{ color: props.color, fontSize: props.headerSize + "px" }}
          >
            <div className="creative-icon">
              <i className="fas fa-cogs" />
            </div>{" "}
            Skills
          </div>
        )}
        <p className="secondary-text skills">
          {props.skills.map((skill, i) => {
            return (
              <span key={i}>
                {skill}
                {i < props.skills.length - 1 && ", "}
              </span>
            );
          })}
        </p>

        {props.experience.length > 0 && (
          <section className="resume-section" id="section-exp">
            <div
              className="creative-header"
              style={{ color: props.color, fontSize: props.headerSize + "px" }}
            >
              <div className="creative-icon">
                <i className="fas fa-briefcase" />
              </div>{" "}
              Experience
            </div>
            {props.experience.map((job, i) => {
              return (
                <div className="experience" key={"exp" + i}>
                  <div className="exp-left">
                    <p className="exp-company primary-text">{job.company}</p>
                    <p className="exp-location secondary-text">
                      {job.location}
                    </p>
                    <p className="exp-dates secondary-text">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                  <div className="exp-right">
                    <p className="exp-title primary-text">{job.title}</p>
                    {!job.listFormat && (
                      <p className="exp-desc secondary-text">
                        {job.description}
                      </p>
                    )}
                    {job.listFormat && (
                      <ul className="exp-list">
                        {job.descList.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {props.education.length > 0 && (
          <div
            className="creative-header"
            style={{ color: props.color, fontSize: props.headerSize + "px" }}
          >
            <div className="creative-icon">
              <i className="fas fa-university" />
            </div>{" "}
            Education
          </div>
        )}
        {props.education.map((entry, i) => {
          return (
            <div className="experience" key={"edu" + i}>
              <div className="exp-left">
                <p className="exp-company primary-text">
                  {entry.school}
                  <span className="secondary-text">, {entry.location}</span>
                </p>
                <p className="exp-dates secondary-text">
                  {entry.startYear} - {entry.endYear}
                </p>
              </div>
              <div className="exp-right">
                <p className="exp-title primary-text">{entry.degree}</p>
                <p className="exp-desc secondary-text">{entry.achievements}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreativeTemplate;
