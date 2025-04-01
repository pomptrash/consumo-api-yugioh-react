import { useState } from "react"
import { DeckSection } from "./DeckSection"

// FUNÇÕES PARA PESQUISAR E GERAR CARTA ALEATÓRIA RECEBIDAS COMO PROPS
export function InputSection({searchCard, randomCard, cardArray, deck, actualCard, setActualCard, removeFromDeck}){
    const [newInput, setNewInput] = useState('')
    const [deckDisplay, setDeckDisplay] = useState(false)
    
    return (
        <section className="container my-5 d-flex flex-column gap-2 text-light">
            <label className="h1" htmlFor="cardInput">Cartas YuGiOh</label>
            <input className="p-1" list="datalist" value={newInput} onChange={e=>setNewInput(e.target.value)} type="text" name="cardInput" id="cardInput" placeholder="Nome da carta" />
            <datalist id="datalist">
                {cardArray.map((card) => (
                    <option key={card.id} value={card.name} />
                ))}
            </datalist>
            <div className="btns-div d-flex gap-1">
                <button className="btn" onClick={e=>searchCard(newInput)} id="btnSearch">Pesquisar</button>
                <button className="btn" onClick={e=>randomCard()} id="btnRandomCard">Carta Aleatória</button>
                <button className="btn" onClick={e=>{
                    setDeckDisplay(!deckDisplay)
                }} id="btnSeeDeck">
                    {deckDisplay? 'Ocultar Deck': 'Ver Deck'}
                </button>
            </div>
            {deckDisplay && <DeckSection deck={deck} actualCard={actualCard} setActualCard={setActualCard} removeFromDeck={removeFromDeck}/>}
        </section>
    )
}