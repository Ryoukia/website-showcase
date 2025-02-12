import visualizationData from "./provider_data/candidate_data.json";
import ScatterPlot from "./ScatterPlot";

const ProviderVisualization3 = () => {
  let data = [];

  for (let i = 0; i < visualizationData["politicians"].length; i++) {
    let dob = visualizationData["politicians"][i]["date_of_birth"];
    dob = dob.substring(0, 4);
    dob = parseInt(dob);

    let firstElected = visualizationData["politicians"][i]["first_elected"];

    data.push([dob, firstElected]);
  }

  return (
    <div className="display-box">
      <h2>
        Provider Visualization 3: Politician Year First Elected vs Date of Birth
      </h2>
      <ScatterPlot
        data={data}
        width={800}
        height={600}
        xDomainMin={1930}
        xDomainMax={2000}
        yDomainMin={1940}
        yDomainMax={2022}
        xTicks={10}
        yTicks={10}
        xLabel={"Date of Birth"}
        yLabel={"Year First Elected"}
        xLabelOffset={50}
        yLabelOffset={175}
      ></ScatterPlot>
    </div>
  );
};

export default ProviderVisualization3;
