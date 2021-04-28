import React from 'react';
import './Popup.css';

function Popup(props) {
    return(props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="Title">
                    {props.msg}
                </div>
                <button onClick={props.onClickCB} className="close-btn">Close Popup</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup