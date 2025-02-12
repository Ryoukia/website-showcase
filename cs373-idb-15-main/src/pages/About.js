import { useEffect, useState } from "react";
import DevCard from "../components/DevCard";
import ApiCard from "../components/ApiCard";
import ToolCard from "../components/ToolCard";
import "./About.css";
import alexpic from "../images/alexcisneros.jpg";
import laurenpic from "../images/laurenhubbardpic.png";
import raunakkpic from "../images/raunakkchandhokepic.jpg";
import colinpic from "../images/colinlessor.png";
import janlloydpic from "../images/janlloyd-pic.jpg";


const teamMemberData = [
  {
    name: "Alex Cisneros",
    gitLabId: "@aacisneros444",
    role: "Front End",
    bio: "I'm a third year computer science major at the University of Texas at Austin. In my free time, I love working out, walking my dogs, and going to the beach.",
    email: "aacisneros444@gmail.com",
    commits: 0,
    issues: 0,
    unitTests: 0,
    profilePic: alexpic,
  },

  {
    name: "Lauren Hubbard",
    gitLabId: "@lhub2001",
    role: "Front End and Back End",
    bio: "I'm a senior computer science major at the University of Texas at Austin. In my free time I enjoy going on walks, spending time with friends, and exploring Austin.",
    email: "lhub2001@utexas.edu",
    commits: 0,
    issues: 0,
    unitTests: 0,
    profilePic: laurenpic,
  },

  {
    name: "Colin Lessor",
    gitLabId: "@Ryoukia",
    role: "Front End/Documentation",
    bio: "I'm a junior computer science major at the University of Texas at Austin. In my free time I enjoy cooking, playing video games, and going to the gym.",
    email: "clessor99@gmail.com",
    commits: 0,
    issues: 0,
    unitTests: 0,
    profilePic: colinpic,
  },

  {
    name: "Janlloyd C Carangan",
    gitLabId: "@carangan",
    role: "Backend",
    bio: "I'm currently a senior computer science major at UT. During my spare time I like to workout, play basketball, and play poker.",
    email: "carangan@utexas.edu",
    commits: 0,
    issues: 0,
    unitTests: 0,
    profilePic: janlloydpic,
  },

  {
    name: "Raunakk Chandhoke",
    gitLabId: "@Raul21.13",
    role: "Front End/Documentation",
    bio: "I'm a second-year computer science major at the University of Texas at Austin. In my free time, I love gardening, reading, and playing video games.",
    email: "raunakk.chandhoke@gmail.com",
    commits: 0,
    issues: 0,
    unitTests: 0,
    profilePic: raunakkpic,
  },
];

const apiData = [
    {
        name: "Yelp API",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/1200px-Yelp_Logo.svg.png",
        description: "  API for Restaurant Data, scraped for score, reviews, price, location, and types of cuisines",
        url: "  https://docs.developer.yelp.com/docs/getting-started"

    },
    {
        name: "Countries Now API",
        imageUrl: "https://countriesnow.space/img/1.png",
        description: "  API for City Names and Populations",
        url: "https://documenter.getpostman.com/view/1134062/T1LJjU52?version=latest"
    },
    {
        name: "Bing Images API",
        imageUrl: "https://www.passionateinmarketing.com/wp-content/uploads/2020/09/Bing.jpg",
        description: "  API for City Images",
        url: "  https://www.microsoft.com/en-us/bing/apis/bing-image-search-api"
    },
    {
        name: "Spoonacular API",
        imageUrl: "https://spoonacular.com/images/spoonacular-logo-b.svg",
        description: "  API for Recipe Information",
        url: "  https://spoonacular.com/food-api"
    }
];

const toolData = [
    {
        name: "React",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
        description: "Front end implementation",
        url: "https://reactjs.org/"
    },
    {
        name: "React Router",
        imageUrl: "https://reactrouter.com/twitterimage.jpg",
        description: "Front end implementation",
        url: "https://reactrouter.com/en/main"
    },
    {
        name: "Bootstrap",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png",
        description: "Front end styling",
        url: "https://getbootstrap.com/"
    },
    {
        name: "AWS Amplify",
        imageUrl: "https://docs.amplify.aws/assets/ogp.jpg",
        description: "Backend server hosting",
        url: "https://aws.amazon.com/amplify/"
    },
    {
        name: "Flask",
        imageUrl: "https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-ar21.png",
        description: "Hosts back-end API calls",
        url: "https://flask.palletsprojects.com/en/2.2.x/"
    },
    {
        name: "PostgreSQL",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        description: "Database storage",
        url: "https://www.postgresql.org/"
    },
    {
        name: "Postman",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfc24veIzQpkSWQuj1v3-Is-7KNhN7dv2aCvaCPtC&s",
        description: "Used to design, test, and doucment our API.",
        url: "https://www.postman.com/"
    },
    {
        name: "Jest",
        imageUrl: "https://ih1.redbubble.net/image.404020079.1876/st,small,507x507-pad,600x600,f8f8f8.u7.jpg",
        description: "Javascript unit testing software",
        url: "https://jestjs.io/"
    },
    {
        name: "Selenium",
        imageUrl: "https://camo.githubusercontent.com/4b95df4d6ca7a01afc25d27159804dc5a7d0df41d8131aaf50c9f84847dfda21/68747470733a2f2f73656c656e69756d2e6465762f696d616765732f73656c656e69756d5f6c6f676f5f7371756172655f677265656e2e706e67",
        description: "Unit testing help",
        url: "https://www.selenium.dev/"
    }
];

const About = () => {
  const [gitCommits, setGitCommits] = useState([]);
  const [gitLabIssues, setGitLabIssues] = useState([]);

  const getGitCommits = async () => {
    const response = await fetch(
      "https://gitlab.com/api/v4/projects/43354163/repository/contributors"
    );
    const data = await response.json();
    setGitCommits(data);
  };

  const getGitLabIssues = async () => {
    const response = await fetch(
      "https://gitlab.com/api/v4/projects/43354163/issues"
    );
    const data = await response.json();
    setGitLabIssues(data);
  };

  useEffect(() => {
    getGitCommits();
    getGitLabIssues();
  }, []);

  const updateTeamStats = () => {
    const getCommits = (memberEmail) => {
      const filtered = gitCommits.filter((commitData) => {
        return commitData.email == memberEmail;
      });
      const totalCommits = filtered.reduce((acc, curr) => {
        return acc + curr["commits"];
      }, 0);

      return totalCommits;
    };

    const getIssues = (gitLabUserName) => {
      const filtered = gitLabIssues.filter((issueData) => {
        return issueData["author"]["username"] == gitLabUserName;
      });
      return filtered.length;
    };

    teamMemberData.map((member) => {
      member.commits = getCommits(member.email);
      member.issues = getIssues(
        member.gitLabId.substring(1, member.gitLabId.length)
      );
    });
  };

  updateTeamStats();

  return (
    <>
      <div className="about-text">
        <h1 style={{textAlign: "center"}}>About Us</h1>
        <p className="goal-text">
          Our goal is to connect food enthusiasts to recipes, restaurants, and
          cities where delicious food can be found from all over the world.
        </p>
      </div>

      <div className="dev-cards">
        {teamMemberData.map((member) => (
          <DevCard devData={member} />
        ))}
      </div>
      <div className="api-cards">
        {apiData.map((member) => (
          <ApiCard apiData={member} />
        ))}
       </div>
      <div className="api-cards">
        {toolData.map((member) => (
          <ToolCard toolData={member} />
        ))}
      </div>
          <div>
              <h3>GitLab Repository: https://gitlab.com/lhub2001/cs373-idb-15 </h3>
              <h3>Postman API Link: https://documenter.getpostman.com/view/25838982/2s93CExciz </h3>
          </div>
      </>
  );
};

export default About;
