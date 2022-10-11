import React from 'react';
import CardItem from "./CardItem";

const CardTable = (props) => {
    console.log(props)
    return (
        <div style={
            {
                display: "flex",
                gap: "16px"
            }
        }>
            {props.userInfo.card.map((element) => {
                return (
                    <CardItem content={element.content}/>
                )
            })}


        </div>
    );
};

export default CardTable;
