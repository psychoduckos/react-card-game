import React from "react";
import "./SentenseCard.css"

function SentenceCard(props) {
    return (

        <div className="Sentense">
            <h3>{props.content}</h3>
        </div>
     );
}

export default SentenceCard;
