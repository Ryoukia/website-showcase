import "./ApiCard.css";

const ApiCard = ({ apiData }) => {
    return (
        <div className="api-card">
            <div>
                {/* <img src="https://via.placeholder.com/250" alt="new" /> */}
                <img src={apiData.imageUrl} alt="new" width="150" height="150" />
            </div>

            <div className="card-text">
                <div>
                    <li>{apiData.name}</li>
                    <li>{apiData.description}</li>
                    <li>Link: {apiData.url}</li>
                </div>
            </div>
        </div>
    );
};

export default ApiCard;
