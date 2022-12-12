import { useState, useEffect } from "react";
import './App.css';

const symbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "å", "ä", "ö",
  "*", "-", "%"];

const Card = ({ symbol, revealed, handleClick }) => {
  return (
    <div className={revealed ? "card-revealed" : "card"} onClick={!revealed ? handleClick : undefined}>
      {revealed ? <p>{symbol}</p> : null}
    </div>
  );
};

const Menu = ({ numberOfPairs, setNumberOfPairs, starGame }) => {
  return (
    <div className="menu">
      <h2>Number of pairs</h2>
      <input type="number" min="2" max="32" value={numberOfPairs} onChange={e => setNumberOfPairs(Number(e.target.value))} />
      <button onClick={starGame}>Start</button>
    </div>
  );
}

function App() {
  const [running, setRunning] = useState(false);
  const [numberOfPairs, setNumberOfPairs] = useState(2);
  const [cards, setCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const starGame = () => {
    let cardsToAdd = [];

    for (let i = 0; i < numberOfPairs; i++) {
      for (let j = 0; j <= 1; j++) {
        cardsToAdd = [...cardsToAdd, { symbol: symbols[i], id: [i] + [j] }]
      }
    }

    for (let i = 0; i < cardsToAdd.length; i++) {
      let randomIndex = Math.floor(Math.random() * (cardsToAdd.length - 1));
      [cardsToAdd[i], cardsToAdd[randomIndex]] = [cardsToAdd[randomIndex], cardsToAdd[i]];
    }

    setCards(cardsToAdd);
    setRunning(true);
  }

  const handleClick = (card) => {
    if (selectedCards.length < 1 || selectedCards.length === 2) {
      setselectedCards([card])
      return;
    }

    if (selectedCards[0].symbol === card.symbol) {
      setRevealedCards([...revealedCards, card.symbol]);
    }
    setMoves(moves + 1);
    setselectedCards([...selectedCards, card]);
  }

  useEffect(() => {
    if (revealedCards.length === numberOfPairs) {
      const timeOut = setTimeout(() => {
        alert(`Game passed with ${moves} moves`);
        setRunning(false);
        setRevealedCards([]);
        setselectedCards([]);
      }, 500)

      return (() => { clearTimeout(timeOut) });
    }
  }, [revealedCards]);

  return (
    <div className="App">
      {running
        ?
        <div className="board">
          {cards.map(card => <Card key={card.id} symbol={card.symbol} revealed={revealedCards.find(revealedCard => revealedCard === card.symbol)
            || selectedCards.find(selectedCard => selectedCard.id === card.id)} handleClick={() => handleClick(card)} />)}
        </div>
        :
        <Menu numberOfPairs={numberOfPairs} setNumberOfPairs={setNumberOfPairs} starGame={starGame} />
      }
    </div>
  );
}

export default App;
