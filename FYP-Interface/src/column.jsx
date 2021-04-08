import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Course from './course';

export default class Column extends React.Component {
	render() { return (
		<div className={this.props.sem.id+' semesterContainer'}>
			<div className="title">{this.props.sem.title}</div>
			<Droppable droppableId={this.props.sem.id}>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="courseField">
						{this.props.sem.courseIds.map((courseId, index) => {
							const course = this.props.courses[courseId];
							return <Course key={course.id} id={course.id} index={index} desc={course.desc} />
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)}
}
