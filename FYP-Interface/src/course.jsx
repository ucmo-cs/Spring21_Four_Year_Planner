import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import infoIcon from './information.svg';

export default class Course extends React.PureComponent {

	static popupCB;

	render() {

		let isInvalid = false;
		// only run if state received (does not when in availableCourses)
		if(this.props.state){
			const prereqs = new Set(this.props.state.prerequisites[this.props.id]);

			for(const sem of Object.values(this.props.state.semesters)){
				// only search prior semesters
				if(sem.courseIds.includes(this.props.id)){
					break;
				}
				sem.courseIds.forEach(c => prereqs.delete(c))
			}

			if(prereqs.size > 0){
				isInvalid = true;
			}
		}

		return (
			<Draggable draggableId={this.props.id} index={this.props.index}>
				{provided => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						className={"courseLabel informational " + (isInvalid ? "isInvalid" : "")}
					>
						<div style={{
							outline:"1px solid black",
							paddingLeft: "8px",
							paddingRight: 2,
							//fontSize: ".75em"
							display: "flex",
							justifyContent: "space-between",
						}}>
							{this.props.id}
							<button onClick={() => {
								Course.popupCB(this.props.desc)
							}}><i class="fa fa-info-circle"></i></button>
						</div>
						<div style={{padding: "8px"}}>{this.props.desc}</div>
					</div>
				)}
			</Draggable>
		)
	}
}
