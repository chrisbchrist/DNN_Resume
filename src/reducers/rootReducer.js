const initialState = {
  resume: {
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
          "I accomplished all my stated goals in a single term and fulfilled my promise not to seek a second."
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
    skills: ["Dazzling oratory", "Austerity", "Severity"]
  },
  color: "#16a0db",
  font: "Raleway",
  textSize: 14,
  headerSize: 15,
  template: "classic"
};

function rootReducer(state = initialState, action) {
  return state;
}

export default rootReducer;
