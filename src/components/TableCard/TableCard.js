import React from 'react';
import TableCardItem from "./TableCardItem";
import '../UI.css'

const TableCard = (props) => {
    return (
        <div className="CardTable">
            <h3>Card Table</h3>
            <div className="CardTableItems">
                {props.tableCard.map((element, index) => {
                    return (
                        <TableCardItem content={element.card.content} key={index} userName={element.userName} choseWinner={props.choseWinner}/>
                    )
                })}
            </div>
        </div>
    );
};

export default TableCard;