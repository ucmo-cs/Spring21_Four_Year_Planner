import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './initialData';
import Semester from './semester';
import AvailableCourses from './availableCourses';
import { DragDropContext } from 'react-beautiful-dnd';

const generateState = () => {
	const state = initialData;
	/* generate availableCourses here */
	state.availableCourses = Object.keys(state.courses);

	// Remove all planned courses from the available courses list
	// Makes no sense to be able to add a course that you're already taking
	// Maybe move this filter to the AvailableCourses render()?
	for(const sem of Object.values(state.semesters)){
		for(const courseId of sem.courseIds){
			state.availableCourses = state.availableCourses.filter(e => e !== courseId);
		}
	}

	return state;
}

class App extends React.Component {
	state = generateState();

	onDragEnd = result => {
		const { destination, source, draggableId } = result;

		if(!destination) return;

		const sourceSem = this.state.semesters[source.droppableId];
		const destSem = this.state.semesters[destination.droppableId];
		const newSourceCourseIds = Array.from(sourceSem.courseIds);

		newSourceCourseIds.splice(source.index, 1);

		// Allows for reording within the same column
		const newDestCourseIds =
			(destination.droppableId === source.droppableId) ?
			newSourceCourseIds :
			Array.from(destSem.courseIds);

		newDestCourseIds.splice(destination.index, 0, draggableId);

		const newState = Object.assign({}, this.state);
		newState.semesters[sourceSem.id].courseIds = newSourceCourseIds;
		newState.semesters[destSem.id].courseIds = newDestCourseIds;

		this.setState(newState);
	}

	render() { return (
		<DragDropContext onDragEnd={this.onDragEnd}>
			<div className="gridContainer">
				<div className="ribbon">This is the ribbon</div>
				<AvailableCourses courseIds={this.state.availableCourses} courses={this.state.courses}/>
				{Object.values(this.state.semesters).map((sem, index) => {
					return <Semester key={sem.id} sem={sem} courses={this.state.courses} />
				})}
				<div className="catalog">Major catalog here</div>
			</div>
		</DragDropContext>
	)}
}

ReactDOM.render(<App />, document.getElementById('root'));
