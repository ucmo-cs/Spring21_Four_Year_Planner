import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Course extends React.Component {
	render() { return (
		<Draggable draggableId={this.props.id} index={this.props.index}>
			{provided => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className="courseLabel"
				>
					{this.props.desc}
				</div>
			)}
		</Draggable>
	)}
}
