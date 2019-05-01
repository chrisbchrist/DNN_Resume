import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  SET_SIZE,
  UPDATE_FIELD,
  REORDER,
  SAVE_PDF,
  DB_SAVE
} from "../actions/constants";

const initialState = {
  name: "James K. Polk",
  currentPosition: "11th President",
  location: "The White House, USA",
  summary:
    "I'm James K. Polk, and I was a U.S. President elected in 1844!  I served for only one term, and my wife and I were notorious workaholics.  I seized the whole Southwest from Mexico!",
  email: "jkpolk@imdead.com",
  phone: "123.456.7890",
  experience: [
    {
      title: "Not the President",
      company: "America",
      startDate: "1848",
      endDate: "Death",
      location: "Western Hemisphere",
      description:
        "I accomplished all my stated goals in a single term and fulfilled my promise not to seek a second.",
      descList: [],
      listFormat: false
    },
    {
      title: "11th President",
      company: "America",
      startDate: "1844",
      endDate: "1848",
      location: "Western Hemisphere",
      description: "",
      descList: [
        "Made sure the tariffs fell.",
        "Made sure the English sold the Oregon Territory.",
        "Built an independent Treasury."
      ],
      listFormat: true,
      image: ""
    }
  ],
  education: [
    {
      school: "Florida State University",
      degree: "Presidential Studies",
      startYear: "1832",
      endYear: "1836",
      location: "Florida",
      achievements: "Fulfilled our Manifest Destiny"
    }
  ],
  skills: ["Dazzling oratory", "Austerity", "Severity"],
  color: "#16a0db",
  font: "Raleway",
  textSize: 14,
  headerSize: 15,
  template: "classic"
};

const myState = {
  items: [],
  textSize: 14,
  headerSize: 18,
  template: "classic",
  font: "Raleway",
  color: "rgb(153, 0, 239)",
  name: "Christopher Blakely",
  location: "West Palm Beach, FL",
  email: "chris@chris-blakely.com",
  phone: "(617) - 817 - 4780",
  currentPosition: "Web Developer",
  summary:
    "Self-taught front end developer with a full stack foundation, an addiction to learning and a passion for solving difficult problems in creative ways. Coding since 2016, currently focused on MERN development with .NET experience, I'm a grateful and motivated critical thinker with the ability to adapt to new technologies and turn them into real-world solutions quickly.",
  image: "",
  experience: [
    {
      title: "Front End Web Developer",
      company: "Careersource Palm Beach County",
      startDate: "Dec 2017",
      endDate: "Present",
      location: "West Palm Beach, FL",
      description: "",
      descList: [
        "Primary developer for an organizational web product offering career tools and services, responsible for creating, developing, testing, updating and maintaining several DotNetNuke web portals and realizing new functionality as envisioned by management",
        "Developed interactive client-side data tools with React and jQuery, making use of numerous JavaScript libraries and 3rd party REST API's to integrate and visualize dynamic labor market information",
        "Developed and tested DotNetNuke single page application modules with a modern React workflow and wrote server-side ASP.NET Web API routes in C# to add back-end capabilities.",
        "Built responsive, cross-browser compatible and pixel-perfect web pages from provided mock-ups using HTML5, CSS3 and JavaScript ES6",
        "Wrote content, designed and produced promotional materials/videos, and gave public presentations in support of the project, including at the statewide 2018 Workforce Development Summit in Orlando"
      ],
      listFormat: true
    },
    {
      title: "Visa Specialist",
      company: "Expedited Travel",
      startDate: "Jun 2016",
      endDate: "Dec 2017",
      location: "West Palm Beach, FL",
      description: "",
      descList: [
        "Answered general knowledge questions and provided guidance and customer service to clients obtaining a travel visa",
        "Performed detailed document checks and verifications of visa application paperwork",
        "Interfaced with couriers across the country to track the processing and shipment of paperwork and completed visas and resolve any issues in a timely manner"
      ],
      listFormat: true
    },
    {
      title: "Beach Club Associate",
      company: "The Mar-a-Lago Club",
      startDate: "Oct 2015",
      endDate: "Jun 2016",
      location: "Palm Beach, FL",
      description: "",
      descList: [
        "Greeted and arranged seating for guests, provided world class food and beverage service and attended to any and all needs of Club members at the poolside and beachfront facilities."
      ],
      listFormat: true
    }
  ],
  education: [
    {
      school: "Florida State University",
      degree: "Presidential Studies",
      startYear: "1832",
      endYear: "1836",
      location: "Florida",
      achievements: "Fulfilled our Manifest Destiny"
    },
    {
      school: "Fartington College",
      degree: "Presidential Studies",
      startYear: "1832",
      endYear: "1836",
      location: "Florida",
      achievements: "Fulfilled our Manifest Destiny"
    }
  ],
  skills: [
    "HTML5",
    "CSS3",
    "JavaScript ES6",
    "jQuery",
    "React",
    "Redux",
    "Webpack",
    "DotNetNuke (DNN)",
    "C#",
    "Razor",
    "Git",
    "Node",
    "Express",
    "EJS",
    "Bootstrap",
    "MongoDB",
    "SQL",
    "Adobe Creative Suite (Photoshop, Illustrator, After Effects)"
  ]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      return Object.assign({}, state, {
        [action.collection]: state[action.collection].concat(action.payload)
      });
      break;
    }
    case DELETE_ITEM: {
      const collection = Array.from(state[action.collection]);
      collection.splice(action.index, 1);
      return Object.assign({}, state, { [action.collection]: collection });
      break;
    }
    case UPDATE_ITEM: {
      const collection = Array.from(state[action.collection]);
      collection[action.index] = action.payload;
      return Object.assign({}, state, { [action.collection]: collection });
      break;
    }
    case REORDER: {
      const collection = Array.from(state[action.collection]);
      collection.splice(
        action.newIndex,
        0,
        collection.splice(action.index, 1)[0]
      );
      return Object.assign({}, state, { [action.collection]: collection });
      break;
    }
    case UPDATE_FIELD: {
      return Object.assign({}, state, {
        [action.field]: action.value
      });
      break;
    }
    case SET_SIZE: {
      const target = action.target;
      return Object.assign({}, state, {
        [target]: action.size
      });
      break;
    }
    case SAVE_PDF: {
      let data = Object.assign({}, state);
      console.log(data);
      fetch("/DesktopModules/ResumeBuilder/API/Resume/Save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => {
          console.log(response);
          response.blob();
        })
        .then(blob => {
          var downloadURL = window.URL.createObjectURL(blob);
          window.open(downloadURL);
        })
        .catch(error => console.log(error));
      return state;
      break;
    }
    case DB_SAVE: {
      let data = Object.assign({}, state);
      data.id = -1;
      var service = {
        path: "DnnFree.Modules.SPA.React",
        framework: $.ServicesFramework(moduleId)
      };
      service.baseUrl =
        service.framework.getServiceRoot(service.path) + "Resume/";
      console.log(service);

      fetch("/DesktopModules/ResumeBuilder/API/Resume/Upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => console.log(error));
    }
    default: {
      return state;
    }
  }
}
export default rootReducer;
