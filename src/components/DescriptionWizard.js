import React from "react";
import allJobs from "./jobs";
import JobAutocomplete from "./JobAutocomplete";

export default class DescriptionWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      suggestions: [],
      jobCode: "",
      tasks: "",
      selectedTasks: [],
      error: false
    };
    this.getData = this.getData.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.finish = this.finish.bind(this);
  }

  //Get task data for occupation selected from autocomplete
  getData(occupation) {
    const code = allJobs[occupation].SOC + ".00";
    fetch(
      "https://services.onetcenter.org/ws/online/occupations/" +
        code +
        "/details/tasks?client=chris_blakely"
    )
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(response => {
        console.log(response);
        if (response.getElementsByTagName("error").length > 0) {
          throw Error("No data available for that job. Try again!");
        }
        let tasks = [];
        const taskNodes = response.getElementsByTagName("task");
        for (let i = 0; i < taskNodes.length; i++) {
          tasks.push({
            task: taskNodes[i].getElementsByTagName("statement")[0].textContent,
            show: true
          });
        }
        this.setState({
          title: occupation,
          jobCode: code,
          tasks: tasks
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
  }

  addTask(e, index) {
    const tasks = Array.from(this.state.tasks);
    tasks[index].show = false;
    const newTask = {
      task: this.state.tasks[index].task,
      index: index
    };
    const selectedTasks = Array.from(this.state.selectedTasks);
    selectedTasks.push(newTask);
    this.setState({
      tasks: tasks,
      selectedTasks: selectedTasks
    });
  }

  removeTask(e, index) {
    let selectedTasks = Array.from(this.state.selectedTasks);
    const originalIndex = selectedTasks[index].index;
    selectedTasks.splice(index, 1);
    let tasks = Array.from(this.state.tasks);
    tasks[originalIndex].show = true;
    this.setState({
      tasks: tasks,
      selectedTasks: selectedTasks
    });
  }

  editTask(e, i) {
    const value = e.target.value;
    let selectedTasks = Array.from(this.state.selectedTasks);
    selectedTasks[i].task = value;
    this.setState({
      selectedTasks: selectedTasks
    });
  }

  finish() {
    let taskText = this.state.selectedTasks.map(task => task.task);
    this.props.setTasks(taskText);
    this.props.closeModal();
  }

  componentDidMount() {
    let jobs = [];
    for (var job in allJobs) {
      jobs.push(job);
    }
    this.setState({
      suggestions: jobs
    });
  }

  render() {
    if (!this.state.jobCode) {
      return (
        <div className="job-wizard">
          <div id="job-wizard-step1">
            <h2 className="custom-modal-title">
              <i className="fas fa-magic" /> Experience Wizard
            </h2>
            <img
              src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1550812849/wizard_1_cp7wes.svg"
              id="sorcerer"
            />
            <p>
              Our experience wizard will help you write accurate, professional
              summaries of your previous work experience by allowing you to view
              and edit the tasks and skills most commonly associated with any
              occupation. Just enter the position you need help describing and
              select the closest match from the list of suggestions.
            </p>
            <JobAutocomplete
              getData={this.getData}
              suggestions={this.state.suggestions}
            />
            {this.state.error && (
              <p className="text-danger">
                Sorry, the Department of Labor does not have tasks on file for
                that occupation, try another title!
              </p>
            )}
          </div>
        </div>
      );
    } else if (this.state.jobCode) {
      return (
        <div className="job-wizard">
          <div id="job-wizard-step2">
            <h2 className="custom-modal-title">
              <i className="fas fa-magic" /> Experience Wizard
            </h2>
            <p>
              Click on relevant tasks below to edit and add them to your resumé.
              Note that these are only <strong>general suggestions</strong>, and
              we recommend customizing the entries to reflect your own personal
              experience and job duties.
            </p>
            <h5>{this.state.title}</h5>
            <div id="wizard-selector">
              <div id="wizard-inputs">
                {this.state.selectedTasks.length > 0 &&
                  this.state.selectedTasks.map((task, i) => {
                    return (
                      <div className="wizard-input" key={i}>
                        <div
                          className="wizard-delete"
                          onClick={e => this.removeTask(e, i)}
                        >
                          <i className="fas fa-times" />
                        </div>
                        <textarea
                          spellCheck="true"
                          className="form-control"
                          value={this.state.selectedTasks[i].task}
                          onChange={e => this.editTask(e, i)}
                        />
                      </div>
                    );
                  })}
              </div>
              <div id="wizard-arrows">
                <i className="fas fa-arrow-left" />
              </div>
              <div id="wizard-tasks">
                {this.state.tasks.map((task, i) => {
                  if (task.show) {
                    return (
                      <div
                        className="wizard-task"
                        onClick={e => this.addTask(e, i)}
                        key={i}
                      >
                        <p>{task.task}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div id="wizard-controls">
              <div className="add-btn cancel" onClick={this.props.closeModal}>
                <i className="fas fa-times" /> Cancel
              </div>
              <div className="add-btn" onClick={this.finish}>
                <i className="fas fa-check" /> Done
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
