import React from "react";

const ClassicTemplate = props => {
  return (
    <div
      className="preview preview-classic"
      style={{ fontFamily: props.font, fontSize: props.fontSize + "px" }}
    >
      <h1 id="name" style={{ color: props.color }}>
        {props.name}
      </h1>
      <p id="contact">
        {props.location}
        {props.email != "" && (
          <span>
            <span style={{ color: props.color, opacity: 0.7 }}> | </span>
            <span style={{ fontWeight: "bold" }}>E: </span>
            {props.email}
          </span>
        )}
        {props.phone != "" && (
          <span>
            <span style={{ color: props.color, opacity: 0.7 }}> | </span>
            <span style={{ fontWeight: "bold" }}>C: </span>
            {props.phone}
          </span>
        )}
      </p>
      <p id="current-position">{props.currentPosition}</p>
      <div id="summary">{props.summary}</div>

      {props.skills.length > 0 && (
        <p
          className="exp-header"
          style={{ color: props.color, fontSize: props.headerSize + "px" }}
        >
          <i className="fas fa-cogs" /> Skills
        </p>
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
          <p
            className="exp-header"
            style={{ color: props.color, fontSize: props.headerSize + "px" }}
          >
            <i className="fas fa-briefcase" /> Experience
          </p>
          {props.experience.map((job, i) => {
            return (
              <div className="experience" key={"exp" + i}>
                <div className="exp-left">
                  <p className="exp-company primary-text">{job.company}</p>
                  <p className="exp-location secondary-text">{job.location}</p>
                  <p className="exp-dates secondary-text">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <div className="exp-right">
                  <p className="exp-title primary-text">{job.title}</p>
                  {!job.listFormat && (
                    <p className="exp-desc secondary-text">{job.description}</p>
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
      <p
        className="exp-header"
        style={{ color: props.color, fontSize: props.headerSize + "px" }}
      >
        <i className="fas fa-certificate" /> Certifications
      </p>
      <p>Certified in Front End Development by freeCodeCamp.com</p>
      {props.education.length > 0 && (
        <p
          className="exp-header"
          style={{ color: props.color, fontSize: props.headerSize + "px" }}
        >
          <i className="fas fa-university" /> Education
        </p>
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
  );
};

export default ClassicTemplate;
