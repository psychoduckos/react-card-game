import React from "react";
import '../UI.css'

function TableCardItem(props) {
    return (
        <div id="animation" onClick={(e) => props.choseWinner(props.userName, e)}>
            {props.content}
        </div>

     );
}

export default TableCardItem;