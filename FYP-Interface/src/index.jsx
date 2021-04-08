import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './initialData';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';


const generateState = () => {
	const state = initialData;
	/* generate availableCourses here */

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

		const newState = this.state;
		newState.semesters[sourceSem.id].courseIds = newSourceCourseIds;
		newState.semesters[destSem.id].courseIds = newDestCourseIds;

		this.setState(newState);
	}

	render() { return (
		<DragDropContext onDragEnd={this.onDragEnd}>
			<div className="gridContainer">
				<div className="ribbon">This is the ribbon</div>
				<div className="courses">Course list here</div>
				{Object.values(this.state.semesters).map((sem, index) => {
					return <Column key={sem.id} sem={sem} courses={this.state.courses} />
				})}
				<div className="catalog">Major catalog here</div>
			</div>
		</DragDropContext>
	)}
}

ReactDOM.render(<App />, document.getElementById('root'));
