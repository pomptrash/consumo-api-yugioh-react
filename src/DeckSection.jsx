export function DeckSection(){
    return (
        <section className="container">
            <h5>Total de cartas: <span id="totalAmount"></span></h5>
            <h5>ATK Total: <span id="totalAmount"></span></h5>
            <h5>DEF Total: <span id="totalAmount"></span></h5>
            <div id="deckDiv">
            </div>
        </section>
    )
}