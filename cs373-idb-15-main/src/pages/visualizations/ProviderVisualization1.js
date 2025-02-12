import PieChart from "./PieChart";
import visualizationData from "./provider_data/candidate_data.json";

const ProviderVisualization1 = () => {
  const data = { Democrat: 0, Republican: 0 };
  const colors = {
    Democrat: "#3366CC",
    Republican: "#FF0000",
  };

  for (let i = 0; i < visualizationData["politicians"].length; i++) {
    let entryParty = visualizationData["politicians"][i]["party"];
    if (entryParty == "R") {
      data["Republican"]++;
    } else if (entryParty == "D") {
      data["Democrat"]++;
    }
  }

  return (
    <div className="display-box">
      <h2>
        Provider Visualization 1: Distribution of Political Party for
        Politicians
      </h2>
      <PieChart data={data} colorMap={colors}></PieChart>
    </div>
  );
};

export default ProviderVisualization1;
