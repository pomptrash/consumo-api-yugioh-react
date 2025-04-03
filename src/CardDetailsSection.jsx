import { useEffect } from "react"
import cardBackwards from './assets/cardBackwards.png'

// CARTA ATUAL RECEBIDA COMO PROP PARA ALIMENTAR OS CAMPOS COM AS INFORMAÇÕES
export function CardDetailsSection({actualCard, addToDeck, deck, showMessageBox, onConfirm, setConfirm}){  
    const src = actualCard?.card_images?.[0]?.image_url
    // criando cópia da carta para gerar key único no objeto
    const copyActualCard = {...actualCard, key: crypto.randomUUID()} 

    // hook para adicionar a carta sempre que OnConfirm for acionado
    useEffect (()=>{
        if (onConfirm) {
            setConfirm(false) 
            return addToDeck(copyActualCard)
        } 
    }, [onConfirm])

    return (
        <section className="container d-flex my-5 flex-wrap gap-4 justify-content-center fw-bold text-light">
            <div className="cardImgDiv d-flex flex-column gap-2">
                <img src={src? src: cardBackwards} id="actualCard" alt="yugioh actualCard" />
                <button className="btn" onClick={e=>{
                    if (deck.length >= 15){ return showMessageBox('Deck cheio. Máximo de 15 cartas', 1)}
                    
                    // AO TENTAR ADICIONAR, VERIFICA SE HÁ UMA CARTA IGUAL
                    const verifyDuplicity = () => {
                        return deck.some(card =>card.id == actualCard.id);
                    }

                    // SE CARTA JÁ EXISTIR NO DECK, MOSTRA MESSAGEBOX PARA VERIFICAR SE VAI CONTINUAR
                    if (verifyDuplicity()){
                        showMessageBox(`A carta '${actualCard.name}' já existe no seu deck. Deseja continuar mesmo assim?`)

                    } else {
                        addToDeck(copyActualCard) // ADICIOINA DIRETO CASO NÃO EXISTA NO DECK
                    }

                }} id="btnAddCard">Adicionar ao Deck</button>
            </div>

            <div className="cardDetailsDiv flex-grow-1">
                <p>ID: <span>{actualCard?.id}</span></p>
                <p>NOME: <span>{actualCard?.name}</span></p>
                <p>TIPO: <span>{actualCard?.type}</span></p>
                <p>ATK: <span>{actualCard?.atk? actualCard.atk:'-'}</span></p>
                <p>DEF: <span>{actualCard?.def? actualCard.def:'-'}</span></p>
                <p>LEVEL: <span>{actualCard?.level? actualCard?.level:'-'}</span></p>
                <p>RAÇA: <span>{actualCard?.race}</span></p>
                <p >DESCRIÇÃO: <span className="h5">{actualCard?.desc}</span></p>
            </div>
        </section>
    )
}