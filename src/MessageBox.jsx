import "./assets/MessageBox.css";

export function MessageBox({ showMessageBox, message, typeMessage, onConfirm, setConfirm}) {
  return (
    <div className="messageBoxContainer">
      <div className="messageBox">

        <div className="header">
          Aviso
        </div>

        <div className="article">
          <p className="message">{message}</p>
        </div>

        <div className="footer">
          {typeMessage == 0 && (
            <>
              <button onClick={e=>{setConfirm(true); showMessageBox()}} type="button" className="ok">
                Continuar
              </button>
              <button onClick={(e)=>{showMessageBox()}} type="button" className="cancel">
                Cancelar
              </button>
            </>
          )}

          {typeMessage == 1 && (
            <button onClick={(e) => { showMessageBox()}} type="button" className="ok">
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
