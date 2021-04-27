import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Course extends React.Component {
	render() {
		let isInvalid = false;
		// only run if state received (does not when in availableCourses)
		if(this.props.state){
			const prereqs = new Set(this.props.state.prerequisites[this.props.id]);
			for(const sem of Object.values(this.props.state.semesters)){
				for(const course of sem.courseIds){
					prereqs.delete(course);
				}
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
						className={"courseLabel" + (isInvalid ? " isInvalid" : "")}
					>
						<div>{this.props.desc}</div>
					</div>
				)}
			</Draggable>
		)
	}
}
