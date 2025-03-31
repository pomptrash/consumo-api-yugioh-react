export function DeckSection({deck, actualCard, setActualCard, removeFromDeck}){
    return (
        <section className="container">
            <h5>Total de cartas: <span id="totalAmount">{deck?.length}</span></h5>
            <h5>ATK Total: <span id="totalAmount">{deck?.reduce((total, card)=> total+card.atk || 0, 0)}</span></h5>
            <h5>DEF Total: <span id="totalAmount">{deck?.reduce((total, card)=> total+card.def || 0, 0)}</span></h5>
            <div id="deckDiv">
                {deck?.map(card=>(
                    <img onDoubleClick={e=>{removeFromDeck(card)}} onClick={e=>{setActualCard(card)}}  key={card?.id+Math.random()} src={card?.card_images?.[0]?.image_url} className="deckCard" alt="carta yugioh"/>
                ))}
            </div>
        </section>
    )
}