import "./ToolCard.css";

const ToolCard = ({ toolData }) => {
    return (
        <div className="tool-card">
            <div>
                {/* <img src="https://via.placeholder.com/250" alt="new" /> */}
                <img src={toolData.imageUrl} alt="new" width="150" height="150" />
            </div>

            <div className="card-text">
                <div>
                    <li>{toolData.name}</li>
                    <li>{toolData.description}</li>
                    <li>Link: {toolData.url}</li>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;
