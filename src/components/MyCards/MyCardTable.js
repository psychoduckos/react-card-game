import React from 'react';
import MyCardItem from "./MyCardItem";
import '../UI.css'

const MyCardTable = (props) => {
    return (
        <div className="MyCards">
            <h3>My cards</h3>
            <div className="MyCardTableItems">
            {props.userInfo.card.map((element, index) => {
                return (
                    <MyCardItem content={element.content} key={index}/>
                )
            })}
            </div>
        </div>
    );
};

export default MyCardTable;
