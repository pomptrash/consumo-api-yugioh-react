import { useEffect, useState } from "react";
import { InputSection } from "./InputSection";
import { CardDetailsSection } from "./CardDetailsSection";
import { MessageBox } from "./MessageBox";

function App() {
  const [cardArray, setNewCardArray] = useState([]); // Array para receber todas as cartas da requisição
  const [actualCard, setActualCard] = useState({}); // Objeto para capturar a carta atual e passar como prop para CardDetails
  const [messageBoxDisplay, setMessageBoxDisplay] = useState(false); // hook para mostrar/ocultar o messageBox
  const [message, setMessage] = useState(''); // hook para definir a mensagem mostrada na messageBox
  const [typeMessage, setTypeMessage] = useState(0); // definir o tipo de messageBox: 0 ou 1
  const [onConfirm, setConfirm] = useState(false); // se o botão de confirmar do messageBox foi clicado.
  
  const [deck, setNewDeck] = useState(() => {
    try {
      const localDeck = localStorage.getItem("Deck");
      if (localDeck == null) return [];
      return JSON.parse(localDeck);
    } catch (error) {
      console.error("erro ao recuperar localstorage:" + error);
      return [];
    }
  }); // Array para armazenar as cartas guardadas no deck

  // FUNÇÃO PARA GAURDAR O DECK NO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("Deck", JSON.stringify(deck));
  }, [deck]);

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
      (card) =>
        card?.name.toLowerCase() === inputValue.toLowerCase() ||
        card?.id == inputValue
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
    if (actualCard?.id)
      return setNewDeck((currentDeck) => [...currentDeck, actualCard]);
    showMessageBox('Selecione uma carta', 1);
  }

  // FUNÇÃO PARA REMOVER CARTA DO DECK
  function removeFromDeck(card) {
    return setNewDeck((currentDeck) => {
      const refreshedDeck = [...currentDeck];
      refreshedDeck.splice(refreshedDeck.indexOf(card), 1);
      return refreshedDeck;
    });
  }

  // FUNÇÃO PARA MOSTRAR o MESSAGEBOX
  function showMessageBox(message='Aviso', type=0){
    setMessage(message)
    setTypeMessage(type)
    return setMessageBoxDisplay(!messageBoxDisplay)
  }
  
  return (
    <>
      {messageBoxDisplay && (
        <MessageBox
          showMessageBox={showMessageBox}
          message={message}
          typeMessage={typeMessage}
          onConfirm={onConfirm}
          setConfirm={setConfirm}
        />
      )}
      <InputSection
        searchCard={searchCard}
        randomCard={randomCard}
        cardArray={cardArray}
        deck={deck}
        actualCard={actualCard}
        setActualCard={setActualCard}
        removeFromDeck={removeFromDeck}
        showMessageBox={showMessageBox}
      />
      <CardDetailsSection
        actualCard={actualCard}
        addToDeck={addToDeck}
        deck={deck}
        showMessageBox={showMessageBox}
        onConfirm={onConfirm}
        setConfirm={setConfirm}
      />
    </>
  );
}

export default App;
