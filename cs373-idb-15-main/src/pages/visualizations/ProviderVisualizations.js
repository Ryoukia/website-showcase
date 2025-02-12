import "./Visualization.css";
import ProviderVisualization1 from "./ProviderVisualization1";
import ProviderVisualization2 from "./ProviderVisualization2";
import ProviderVisualization3 from "./ProviderVisualization3";

const ProviderVisualization = () => {
  return (
    <div>
      <div className="display-box">
        <ProviderVisualization1></ProviderVisualization1>
        <ProviderVisualization2></ProviderVisualization2>
        <ProviderVisualization3></ProviderVisualization3>
      </div>
    </div>
  );
};

export default ProviderVisualization;
