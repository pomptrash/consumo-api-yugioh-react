import { useEffect } from "react"
import cardBackwards from './assets/cardBackwards.png'

// CARTA ATUAL RECEBIDA COMO PROP PARA ALIMENTAR OS CAMPOS COM AS INFORMAÇÕES
export function CardDetailsSection({card}){  
    const src = card?.card_images?.[0]?.image_url_small
    return (
        <section className="container">
            <div className="cardImgDiv">
                <img src={src? src: cardBackwards} alt="yugioh card" />
            </div>
            <div className="cardDetailsDiv">
                <p>ID: <span>{card?.id}</span></p>
                <p>NOME: <span>{card?.name}</span></p>
                <p>TIPO: <span>{card?.type}</span></p>
                <p>ATK: <span>{card?.atk? card.atk:'-'}</span></p>
                <p>DEF: <span>{card?.def? card.def:'-'}</span></p>
                <p>LEVEL: <span>{card?.level? card?.level:'-'}</span></p>
                <p>RAÇA: <span>{card?.race}</span></p>
                <p>DESCRIÇÃO: <span>{card?.desc}</span></p>
                <button id="btn btnAddCard">Adicionar ao Deck</button>
            </div>
        </section>
    )
}