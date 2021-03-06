import './App.css';
import { cardImages } from './components/data/data';
import {useState, useEffect} from 'react'
import Card from './components/card/Card';


function App() {

  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [turns, setTurns] = useState(0)
 
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random()}))
    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null);
    setChoiceTwo(null)
   
  }

  const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.img === choiceTwo.img) {
        setCards((prevCards => {
          return prevCards.map(card => {
            if (card.img === choiceOne.img) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        }))
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
     
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


 


  return (
    <div className="App">
          <div className='title-div'>
              <h1 className='title'>Memory Game</h1>
              <button onClick={shuffleCards} className="btn">New Game</button>
          </div>

          <div className='cards'>
              {cards.map(card => (
              <Card 
                  card={card}  
                  key={card.id} 
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                  />
              ))}
          </div>
                  <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
