import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Course from './course';

export default class Semester extends React.PureComponent {
	render() { return (
		<div className={this.props.sem.id+' semester'}>
			<div className="title">{this.props.sem.title}</div>
			<Droppable droppableId={this.props.sem.id}>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="courseField">
						{this.props.sem.courseIds.map((courseId, index) => {
							const course = this.props.courses[courseId];
							return <Course
								key={course.course_id}
								id={course.course_id}
								index={index}
								desc={course.description}
								state={this.props.state}
								shouldValidate={true}
							/>
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)}
}
