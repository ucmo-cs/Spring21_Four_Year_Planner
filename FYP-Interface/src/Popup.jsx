import React from 'react';
import './Popup.css';

function Popup(props) {
	return(props.active) ? (
		<div className="popup">
			<div className="popup-inner">
				<h3 className="Title">
					Popup
				</h3>
				<div>
					{props.msg}
				</div>
				<button onClick={props.onClickCB} className="close-btn">Close Popup</button>
				{props.children}
			</div>
		</div>
	) : "";
}

export default Popup
