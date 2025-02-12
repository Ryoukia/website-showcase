import visualizationData from "./provider_data/stock_data.json";
import BarChart from "./BarChart";

const ProviderVisualization2 = () => {
  const data = {};

  for (let i = 0; i < visualizationData["stocks"].length; i++) {
    let stockId = visualizationData["stocks"][i]["stock_id"];
    data[stockId] = visualizationData["stocks"][i]["traded_politicians"].length;
  }

  const top10Stocks = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return (
    <div className="display-box">
      <h2>
        Provider Visualization 2: Top 10 Most Popular Stocks Among Politicians
      </h2>
      <BarChart
        data={top10Stocks}
        width={1000}
        height={600}
        xAxisLabel={"Stock"}
        yAxisLabel={"Number of Politicians"}
        xAxisLabelOffset={50}
        yAxisLabelOffset={200}
        numYTicks={5}
        displayXTicks={true}
      ></BarChart>
    </div>
  );
};

export default ProviderVisualization2;
