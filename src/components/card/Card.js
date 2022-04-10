import './card.css'
import {useState} from 'react'


const Card = ({card, handleChoice, flipped, disabled}) => {

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }  
 
  }

  return (
    
        <div className='container'>
            <div className={flipped ? 'flipped card' : 'card'}>
              <div  className='front'><img src={card.img} alt="card-front"/></div>
              <div    onClick={handleClick} 
              className='back' >
           
              </div>
            </div>
        </div>
 

   

    
  )
}

export default Card
