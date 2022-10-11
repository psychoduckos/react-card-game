import React, {useEffect, useState} from "react";

import SentenceCard from "./components/Sentence/SentenseCard";
import TableCardItem from "./components/TableCard/TableCardItem";
import UserItem from "./components/Users/UserItem";
import CardItems from "./components/Cards/CardItem";
import db from "./db/db";
import CardTable from "./components/Cards/CardTable";




function App() {
    const cardCount = 4;
    const [players, setPlayers] = useState([
            {name: "John", card: []},
            {name: "Petya", card: [], isUser: true},
            {name: "Dasha", card: []},
            {name: "Vanya", card: []}
        ]
    )

    const  [user, setUser] = useState(null)

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const getRandomSentence = () => db.card[getRandomInt(db.card.length)]


  const getRandomCard = () => db.word[getRandomInt(db.word.length)]

  const getCardForUser = () => {
      let data = players.map((element) => {
          return {...element, card: [...new Array(cardCount).keys()].map(() => {
                  return getRandomCard()
              })}
      });
      setPlayers(data);
  }

  const getMyCards = () => players.filter(element =>  element.isUser === true ? element.card : null)[0]

  useEffect(() => {
      getCardForUser()
  }, [])

  useEffect(() => {
      console.log(players)
      const data = players[0].card.length !== 0 ? getMyCards() : null
      setUser(data)
      console.log(data)
  }, [players])


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
