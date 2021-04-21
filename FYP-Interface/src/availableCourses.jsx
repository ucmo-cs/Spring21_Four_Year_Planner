import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Course from './course';

export default class AvailableCourses extends React.Component {
	availableCourseIds() {
		var availableCourses = this.props.state.availableCourses;
		for(const sem of Object.values(this.props.state.semesters)){
			for(const courseId of sem.courseIds){
				availableCourses = availableCourses.filter(e => e !== courseId);
			}
		}
		return availableCourses;
	}

	render() { return (
		<div className={'availableCourses'}>
			<div className="title">Available Courses</div>
			<input type="text" placeholder="Course Search"/>
			<Droppable droppableId={'availableCourses'}>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="courseField">
						{this.availableCourseIds().map((courseId, index) => {
							const course = this.props.state.courses[courseId];
							return <Course key={course.id} id={course.id} index={index} desc={course.desc} />
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)}
}
