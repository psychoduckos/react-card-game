import React from "react"
import '../UI.css'

function MyCardItem(props) {
    return (
        <div id="animation" onClick={props.choseCard}>
            {props.content}
        </div>
     );
}

export default MyCardItem;
