import React, {useEffect, useState} from "react";

import SentenceCard from "./components/Sentence/SentenseCard";
import TableCardItem from "./components/TableCard/TableCardItem";
import UserTable from "./components/Users/UserTable";
import CardItems from "./components/MyCards/MyCardItem";
import db from "./db/db";
import MyCardTable from "./components/MyCards/MyCardTable";

function App() {
    //constant
    const cardCount = 4;

    //useStates
    const [players, setPlayers] = useState([
            {name: "John", card: [], isLeader: false, userScore: 0},
            {name: "Petya", card: [], isUser: true, isLeader: false,  userScore: 0},
            {name: "Dasha", card: [], isLeader: false, userScore: 0},
            {name: "Vanya", card: [], isLeader: false, userScore: 0}
        ]
    )
    const [botsCard, setBotsCard] = useState([])

    const  [user, setUser] = useState(null)

    const [cardOnTable, setCardOnTable] = useState([])

    const [leader, setUserLeader] = useState({})

    const [rounds, setRounds] = useState(0)

    // game counter
    // установление лидера и + 1 к раунду - счетчик раундов и игровой процесс
    const newRoundStart = () => {
        setUserLeader(players[rounds])
        setRounds(rounds + 1 )
        setLeader()
        gameOver()
    }

    const setLeader = () => players[rounds].isLeader = true

    const gameOver = () => {
        if(rounds > players.length ) return (
            <div>
                <h1>Game is over</h1>
            </div>

        )
    }

    const chooseWinner = () => {
        if(leader.isUser !== true) {

        } else {

        }
    }

    // Functions
    // random int
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    // random sentence to table
    const getRandomSentence = () => db.card[getRandomInt(db.card.length)]

    // get random card
    const getRandomCard = () => db.word[getRandomInt(db.word.length)]

    // get random users card
    const getCardForUser = () => {
        let data = players.map((element) => {
            return {...element, card: [...new Array(cardCount).keys()].map(() => {
                    return getRandomCard()
                })}
        });
        setPlayers(data);
    }
    // get my  cards
    const getMyCards = () => players.filter(element =>  element.isUser === true ? element.card : null)[0];

    // get bots card to table
    const getBotsCard = () => {
        let data = []
        players.map((element) => {
            if(element.isUser === undefined) {
                return data.push(element.card[getRandomInt(element.card.length)])
            }
            return null
        })
        setCardOnTable(data)
        return data
    }

    // choose my card
    const chooseMyCard = () => {
        const choosenCard = "";
        setCardOnTable(...cardOnTable, choosenCard)
        newRoundStart()

    }

    //useEffects
    // раздаёт карты пользователям
    useEffect(() => {
        getCardForUser();
    }, [])

    // получает карты игрока
    useEffect(() => {
        let data = players[0].card.length !== 0 ? getMyCards() : null
        setUser(data)
    }, [players])


    return (
        <div className="App">
            <SentenceCard content={getRandomSentence().content}/>
            <TableCardItem />
            {players && (<UserTable players={players}/>)}
            {user && (<MyCardTable userInfo={user}/>)}
        </div>
    );
}

export default App;