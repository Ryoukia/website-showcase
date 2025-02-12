import { useState, useEffect } from "react";
import apiData from "./apiData";

function ApiCard(props) {
    const { name, imageUrl, description, url } = props;

    const [hover, setHover] = useState(false);

    return (
        <div
            style={{
                height: 400,
                width: 240,
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                marginLeft: 12,
                marginRight: 12,
                marginTop: 30,
                marginBottom: 30,
            }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <div
                style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <a href={url}>
                    <img
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            marginTop: 40,
                        }}
                        src={imageUrl}
                    ></img>
                </a>
                <div style={{ fontWeight: 500, fontSize: 24, textAlign: "center" }}>
                    {name}
                </div>
                <div style={{ fontWeight: 500, fontSize: 16, textAlign: "center" }}>
                    {description}
                </div>
            </div>
        </div>
    );
}

function ApiCards() {
    const [cards, setCards] = useState();

    useEffect(() => {
        const tempCards = apiData.data.map((object) => {
            return (
                <ApiCard
                    name={object.name}
                    imageUrl={object.imageUrl}
                    description={object.description}
                    url={object.url}
                />
            );
        });
        setCards(tempCards);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
                backgroundColor: "#F6F6F6",
            }}
        >
            {cards}
        </div>
    );
}

export default function Apis() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ marginTop: 100, fontWeight: 500, fontSize: 60 }}>APIs</div>
            <ApiCards />
        </div>
    );
}
