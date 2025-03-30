import { useState } from "react"

// FUNÇÕES PARA PESQUISAR E GERAR CARTA ALEATÓRIA RECEBIDAS COMO PROPS
export function InputSection({searchCard, randomCard}){
    const [newInput, setNewInput] = useState('')
    
    return (
        <section className="container">
            <label htmlFor="cardInput">Cartas YuGiOh</label>
            <input value={newInput} onChange={e=>setNewInput(e.target.value)} type="text" name="cardInput" id="cardInput" />
            <datalist id="datalist">
                {/* criar função para gerar options dinamicamente a partir dos dados retornados na api ou receber o array de cartas como prop do componente pai e iterar aqui */}
            </datalist>
            <div>
                <button onClick={e=>searchCard(newInput)} id="btn btnSearch">Pesquisar</button>
                <button onClick={e=>randomCard()} id="btn btnRandomCard">Carta Aleatória</button>
                <button id="btn btnSeeDeck">Ver Deck de cartas</button>
            </div>
        </section>
    )
}