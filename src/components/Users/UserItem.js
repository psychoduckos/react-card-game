import React from "react"
import '../UI.css'

function UserItem(props) {
    return (
        <tr>
            <td>{props.player}</td>
            <td>{props.score}</td>
        </tr>
    );
}

export default UserItem;
