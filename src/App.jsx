import { useEffect, useState } from 'react'
import { InputSection } from './InputSection'
import { DeckSection } from './DeckSection'
import { CardDetailsSection } from './CardDetailsSection'

function App() {
  const [cardArray, setNewCardArray] = useState([]) // ARRAY PARA RECEBER TODAS AS CARTAS DA REQUISIÇÃO
  const [actualCard, setActualCard] = useState({}) // OBJETO PARA CAPTURAR A CARTA ATUAL E PASSAR COMO PROP PARA CardDetails

  // COONSUMO DA API
  async function fetchData(){
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt')
    return response.json()
  }

  // FUNÇÃO PARA ALIMENTAR O ARRAY (cardArray) COM AS CARTAS RECEBIDAS DA REQUISIÇÃO
  useEffect(()=>{
    fetchData().then(data => setNewCardArray(data.data))
  }, [])

  // FUNÇÃO PARA VALIDAR A CARTA PESQUISADA NO INPUT
  function searchCard(inputValue){
    const cardFiltered = cardArray.find(card => card.name.toLowerCase() === inputValue.toLowerCase())
    return setActualCard(cardFiltered)
  }

  // FUNÇÃO PARA RANDOMIZAR UMA CARTA
  function randomCard(){
    const randomizer = parseInt(Math.floor(Math.random() * cardArray.length))
    return setActualCard(cardArray[randomizer])
  }
  
  return (
    <>
      <InputSection searchCard={searchCard} randomCard={randomCard}/>
      <DeckSection/>
      <CardDetailsSection card={actualCard}/>
    </>
  )
}

export default App
