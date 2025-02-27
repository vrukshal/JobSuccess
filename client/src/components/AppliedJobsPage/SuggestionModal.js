import React from 'react';
import ReactDOM from 'react-dom';
import './SuggestionModal.css';

const SuggestionModal = ({ onClose, children }) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default SuggestionModal;
