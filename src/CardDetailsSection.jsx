import { useEffect } from "react"
import cardBackwards from './assets/cardBackwards.png'

// CARTA ATUAL RECEBIDA COMO PROP PARA ALIMENTAR OS CAMPOS COM AS INFORMAÇÕES
export function CardDetailsSection({actualCard, addToDeck, deck}){  
    const src = actualCard?.card_images?.[0]?.image_url
    return (
        <section className="container">
            <div className="cardImgDiv">
                <img src={src? src: cardBackwards} alt="yugioh actualCard" />
            </div>
            <div className="cardDetailsDiv">
                <p>ID: <span>{actualCard?.id}</span></p>
                <p>NOME: <span>{actualCard?.name}</span></p>
                <p>TIPO: <span>{actualCard?.type}</span></p>
                <p>ATK: <span>{actualCard?.atk? actualCard.atk:'-'}</span></p>
                <p>DEF: <span>{actualCard?.def? actualCard.def:'-'}</span></p>
                <p>LEVEL: <span>{actualCard?.level? actualCard?.level:'-'}</span></p>
                <p>RAÇA: <span>{actualCard?.race}</span></p>
                <p>DESCRIÇÃO: <span>{actualCard?.desc}</span></p>
                <button onClick={e=>{
                    addToDeck(actualCard)
                }} id="btn btnAddCard">Adicionar ao Deck</button>
            </div>
        </section>
    )
}