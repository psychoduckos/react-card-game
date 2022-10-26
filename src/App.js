import React, {useEffect, useState} from "react";

import db from "./db/db";

import SentenceCard from "./components/Sentence/SentenseCard";
import UserTable from "./components/Users/UserTable";
import MyCardTable from "./components/MyCards/MyCardTable";
import TableCard from "./components/TableCard/TableCard";

function App() {
    //constant

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

    const [leader, setUserLeader] = useState({user: {}, leaderCount: 0})

    //gameIteration = players.length * rounds | rounds = players.length
    const [rounds, setRounds] = useState({CurentRound: 0, maxRounds: 16})

    const [sentence, setSentence] = useState(null)
    // game counter
    // установление лидера и + 1 к раунду - счетчик раундов и игровой процесс
    const newRoundStart = () => {
        setUserLeader({user: players[leader.leaderCount], leaderCount: leader.leaderCount + 1})
        if(leader.leaderCount >= players.length) setUserLeader({user: {}, leaderCount: 0})
        setRounds({CurentRound: rounds.CurentRound + 1, maxRounds: rounds.maxRounds})
        console.log(rounds);
        getRandomSentence()
        getCardForUser()
        if (rounds.CurentRound === rounds.maxRounds) {
            console.log(rounds);
            let winner = totalWinner()
            console.log(winner);
            gameOver()
            return false
        }
    }

    const gameOver = () => {
        console.log("GameOver");
            <div style={"position: absolute"}>
                <h1>Game is over</h1>
            </div>
    }

    // Functions
    // random int
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    // random sentence to table
    const getRandomSentence = () => setSentence(db.card[getRandomInt(db.card.length)])

    // get random card
    const getRandomCard = () => db.word[getRandomInt(db.word.length)]

    // get random users card
    const getCardForUser = () => {
        let data = players.map((element) => {
            return {...element, card: [...new Array(players.length).keys()].map(() => {
                    return getRandomCard()
                })}
        });
        setPlayers(data);
    }
    // get my  cards
    const getMyCards = () => players.filter(element =>  element.isUser === true ? element.card : null)[0];

    // Bots logic
    const getBotsCard = () => {
        let data = []
        players.map((element) => {
            if(element.isUser === undefined && element.isLeader === false) {
                let userCard = {
                    userName: element.name,
                    card: element.card[getRandomInt(element.card.length)]
                }
                return data.push(userCard)
            }
            return null
        })
        // удалять у ботов карточку
        return data
    }

    // choose my card
    const choseMyCard = (event) => {
        let chosenCard = event.target.parentNode;
        let index = ([...chosenCard.children].indexOf(event.target))
        let cardData = event.target.innerText
        setCardOnTable([...cardOnTable, {userName: user.name, card: {content: cardData}}])
        user.card.splice(index, 1)
    }


    const cleanTable = () => {setCardOnTable([]); newRoundStart();}

    const addScore = (name) => {

        if(leader.user.isUser !== true) {
            setTimeout(() => {
                let winner = players[getRandomInt(players.length)]
                winner.userScore = winner.userScore + 1;
                let users = players.filter(element => element.name !== winner.name);
                setPlayers([...users, winner]);
                cleanTable();
            }, 5000)
        } else {
            let winner = players.filter(element => element.name == name)[0];
            console.log(winner);
            winner.userScore = winner.userScore + 1;
            let users = players.filter(element => element.name !== name);
            setPlayers([...users, winner]);
            cleanTable();
        }
    }

    const totalWinner = () => players.reduce((previos, current ) => current?.userScore > previos.userScore?current : previos, {userScore:-Infinity});

    //useEffects
    useEffect(() => {
        setUserLeader({user: {}, leaderCount: 0})
    }, [])
    // раздаёт карты пользователям (при каждой смене лидера
    useEffect(() => {
        getCardForUser();
        getRandomSentence()

    }, [])

    useEffect(() => {
        let data = players[0].card.length !== 0 ? getMyCards() : null
        setUser(data)
        let botsCards = players[0].card.length !== 0 ? getBotsCard() : null
        setTimeout(() => {setCardOnTable(botsCards)}, 3000)
    }, [players])

    return (
        <div className="App">
            {sentence && <SentenceCard content={sentence.content}/>}
            {cardOnTable && <TableCard tableCard={cardOnTable} choseWinner={addScore}/>}
            {players && (<UserTable players={players}/>)}
            {user && (<MyCardTable userInfo={user} choseCard={choseMyCard} />)}
        </div>
    );
}

export default App;