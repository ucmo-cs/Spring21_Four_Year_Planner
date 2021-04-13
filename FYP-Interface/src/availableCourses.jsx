import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Course from './course';

export default class AvailableCourses extends React.Component {
	render() { return (
		<div className={'availableCourses'}>
			<div className="title">Available Courses</div>
			<input type="text" placeholder="Course Search"/>
			<Droppable droppableId={'availableCourses'}>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="courseField">
						{this.props.courseIds.map((courseId, index) => {
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
