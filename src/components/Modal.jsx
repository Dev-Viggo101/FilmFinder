import ReactDOM from 'react-dom'

function Modal({ isOpen, onClose, children   }) {

    if(!isOpen){
        return null
    }

  return ReactDOM.createPortal(
    <div className="modal-container">

        <div className="modal-overlay" onClick={onClose}></div>

        <div className="modal-content">
            {children}
            <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>

    </div>,
    document.body
  )
}

export default Modal