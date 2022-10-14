import React, {useEffect, useState} from "react";

import SentenceCard from "./components/Sentence/SentenseCard";
import TableCardItem from "./components/TableCard/TableCardItem";
import UserItem from "./components/Users/UserItem";
import CardItems from "./components/Cards/CardItem";
import db from "./db/db";
import CardTable from "./components/Cards/CardTable";




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

    const [userLeader, setUserLeader] = useState("")

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
    // get my random cards
    const getMyCards = () => players.filter(element =>  element.isUser === true ? element.card : null)[0];

    // get bots card to table
    const getBotsCard = () => {
        let data = []
        players.map((element) => {
            if(element.isUser === undefined) {
                return data.push(element.card[getRandomInt(element.card.length)])
            }
        })
        setCardOnTable(data)
        return data
    }

    const chooseBestPlayer = () => {
        if()
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

    /// useEffect to get randomCard from bots to table
    useEffect(() => {
        let data = getBotsCard()
        setBotsCard(...data)
    }, botsCard)


    return (
        <div className="App">
            <SentenceCard content={getRandomSentence().content}/>
            <TableCardItem/>
            <UserItem/>
            {user && (<CardTable userInfo={user}/>)}
        </div>
    );
}

export default App;