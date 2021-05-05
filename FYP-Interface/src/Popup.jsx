import React from 'react';
import './Popup.css';

function Popup(props) {
	return(props.active) ? (
		<div className="popup" onClick={props.onClickCB}>
			<div className="popup-inner">

				<div className="popup-title">
					<div>{props.msg.title}</div>
					<div className="ribbonFiller"/>
					<button onClick={props.onClickCB} className="close-btn"><i style={{fontSize: 25, 'WebkitFilter': 'invert(1)'}} class="fa fa-times"/></button>
				</div>
				<div>
					{props.msg.body}
				</div>

			</div>
		</div>
	) : "";
}

export default Popup
