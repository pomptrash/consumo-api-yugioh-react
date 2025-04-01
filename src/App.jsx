import { useEffect, useState } from "react";
import { InputSection } from "./InputSection";
import { CardDetailsSection } from "./CardDetailsSection";

function App() {
  const [cardArray, setNewCardArray] = useState([]); // Array para receber todas as cartas da requisição
  const [actualCard, setActualCard] = useState({}); // Objeto para capturar a carta atual e passar como prop para CardDetails
  const [deck, setNewDeck] = useState(()=>{
    try {
      const localDeck = localStorage.getItem('Deck')
      if(localDeck == null) return []
      return JSON.parse(localDeck)
    } catch (error) {
      console.error('erro ao recuperar localstorage:' + error)
      return []
    }
  }); // Array para armazenar as cartas guardadas no deck

  // FUNÇÃO PARA GAURDAR O DECK NO LOCAL STORAGE
  useEffect(()=>{
    localStorage.setItem('Deck', JSON.stringify(deck))
  }, [deck])

  // COONSUMO DA API
  async function fetchData() {
    const response = await fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt"
    );
    return response.json();
  }

  // FUNÇÃO PARA ALIMENTAR O ARRAY (cardArray) COM AS CARTAS RECEBIDAS DA REQUISIÇÃO
  useEffect(() => {
    fetchData().then((data) => setNewCardArray(data.data));
  }, []);

  // FUNÇÃO PARA VALIDAR A CARTA PESQUISADA NO INPUT
  function searchCard(inputValue) {
    const cardFiltered = cardArray.find(
      (card) => card?.name.toLowerCase() === inputValue.toLowerCase()
    );
    return setActualCard(cardFiltered);
  }

  // FUNÇÃO PARA RANDOMIZAR UMA CARTA
  function randomCard() {
    const randomizer = parseInt(Math.floor(Math.random() * cardArray.length));
    return setActualCard(cardArray[randomizer]);
  }

  // FUNÇÃO PARA ADICIONAR CARTA AO DECK
  function addToDeck(actualCard) {
    if(actualCard?.id) return setNewDeck((currentDeck) =>[...currentDeck, actualCard]);
    alert('Selecione uma carta')
  }

  // FUNÇÃO PARA REMOVER CARTA DO DECK
  function removeFromDeck(card){
    return setNewDeck((currentDeck) =>{
      const temporaryDeck = [...currentDeck]
      temporaryDeck.splice(temporaryDeck.indexOf(card), 1)
      return temporaryDeck
    })
  }

  return (
    <>
      <InputSection
        searchCard={searchCard}
        randomCard={randomCard}
        cardArray={cardArray}
        deck={deck}
        actualCard={actualCard}
        setActualCard={setActualCard}
        removeFromDeck={removeFromDeck}
      />
      <CardDetailsSection
        actualCard={actualCard}
        addToDeck={addToDeck}
        deck={deck}
      />
    </>
  );
}

export default App;
