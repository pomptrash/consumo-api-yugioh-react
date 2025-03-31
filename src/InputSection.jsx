import { useState } from "react"
import { DeckSection } from "./DeckSection"

// FUNÇÕES PARA PESQUISAR E GERAR CARTA ALEATÓRIA RECEBIDAS COMO PROPS
export function InputSection({searchCard, randomCard, cardArray, deck, actualCard, setActualCard, removeFromDeck}){
    const [newInput, setNewInput] = useState('')
    const [deckDisplay, setDeckDisplay] = useState(false)
    
    return (
        <section className="container">
            <label htmlFor="cardInput">Cartas YuGiOh</label>
            <input list="datalist" value={newInput} onChange={e=>setNewInput(e.target.value)} type="text" name="cardInput" id="cardInput" />
            <datalist id="datalist">
                {cardArray.map((card) => (
                    <option key={card.id} value={card.name} />
                ))}
            </datalist>
            <div>
                <button onClick={e=>searchCard(newInput)} id="btn btnSearch">Pesquisar</button>
                <button onClick={e=>randomCard()} id="btn btnRandomCard">Carta Aleatória</button>
                <button onClick={e=>{
                    setDeckDisplay(!deckDisplay)
                }} id="btn btnSeeDeck">
                    {deckDisplay? 'Ocultar Deck': 'Ver Deck'}
                </button>
            </div>
            {deckDisplay && <DeckSection deck={deck} actualCard={actualCard} setActualCard={setActualCard} removeFromDeck={removeFromDeck}/>}
        </section>
    )
}