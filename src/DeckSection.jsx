export function DeckSection({deck, actualCard, setActualCard, removeFromDeck}){
    return (
        <section className="container">
            <h5>Total de cartas: <span id="totalAmount">{deck?.length}</span></h5>
            <h5>ATK Total: <span id="totalAmount">{deck?.reduce((total, card)=> total+card.atk || 0, 0)}</span></h5>
            <h5>DEF Total: <span id="totalAmount">{deck?.reduce((total, card)=> total+card.def || 0, 0)}</span></h5>
            <div className="container" id="deckDiv">
                {deck?.map(card=>(
                    <div id="cardDiv" key={card?.key}>
                        <img onClick={e=>{setActualCard(card)}} src={card?.card_images?.[0]?.image_url} className="miniCard" alt="carta yugioh"/>
                        <i  onClick={e=>{removeFromDeck(card); alert(`Carta '${card.name}' removida.`)}} className="bi bi-trash3"></i>
                    </div>

                ))}
            </div>
        </section>
    )
}