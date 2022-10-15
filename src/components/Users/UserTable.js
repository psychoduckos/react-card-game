import React from "react";
import "../UI.css"
import UserItem from "./UserItem";
function UserTable(props) {
    return (
        <div className="PlayersTable">
            <table>
                <tbody>
                    <tr>
                        <th> Players</th>
                        <th> Score</th>
                    </tr>
                    {props.players.map((element, index) => {
                        return (
                            <UserItem player={element.name} score={element.userScore} key={index}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
     );
}

export default UserTable;