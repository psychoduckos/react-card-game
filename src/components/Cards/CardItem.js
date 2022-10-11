import React from "react"

function CardItem(props) {
    return (
        <div style={
            {
                border: "1px solid black",
                padding: "32px"
            }
        }>
            {props.content}
        </div>
     );
}

export default CardItem;
