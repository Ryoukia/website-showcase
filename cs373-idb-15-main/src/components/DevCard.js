import "./DevCard.css";

const DevCard = ({ devData }) => {
  return (
    <div className="dev-card">
      <div>
        {/* <img src="https://via.placeholder.com/250" alt="new" /> */}
        <img src={devData.profilePic} alt="new" width="150" height="150"/>
      </div>

      <div className="card-text">
        <div>
          <li>{devData.name}</li>
          <li>Gitlab ID: {devData.gitLabId}</li>
          <li>Role: {devData.role}</li>
        </div>
        <div className="dev-bio">
          <p>{devData.bio}</p>
        </div>

        <div>
          <li>Commits: {devData.commits}</li>
          <li>Issues: {devData.issues}</li>
          <li>Unit Tests: {devData.unitTests}</li>
        </div>
      </div>
    </div>
  );
};

export default DevCard;
