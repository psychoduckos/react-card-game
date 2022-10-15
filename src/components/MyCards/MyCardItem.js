import React from "react"
import '../UI.css'

function MyCardItem(props) {
    return (
        <div id="animation">
            {props.content}
        </div>
     );
}

export default MyCardItem;
