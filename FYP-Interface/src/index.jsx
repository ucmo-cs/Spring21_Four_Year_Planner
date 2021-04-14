import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './initialData';
import Semester from './semester';
import AvailableCourses from './availableCourses';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
	state = initialData;

	onDragEnd = result => {
		const { destination, source, draggableId } = result;

		if(!destination) return;

		console.log(destination)

		const newState = Object.assign({}, this.state);

		if(source.droppableId !== "availableCourses") {
			const sourceSem = this.state.semesters[source.droppableId];
			const newSourceCourseIds = Array.from(sourceSem.courseIds);
			newSourceCourseIds.splice(source.index, 1);
			newState.semesters[sourceSem.id].courseIds = newSourceCourseIds;
		}

		if(destination.droppableId !== "availableCourses") {
			const destSem = newState.semesters[destination.droppableId];
			const newDestCourseIds = Array.from(destSem.courseIds);
			newDestCourseIds.splice(destination.index, 0, draggableId);
			newState.semesters[destSem.id].courseIds = newDestCourseIds;
		}

		this.setState(newState);
	}

	render() { return (
		<DragDropContext onDragEnd={this.onDragEnd}>
			<div className="gridContainer">
				<div className="ribbon">This is the ribbon</div>
				<AvailableCourses courseIds={generateAvailableCourses(this.state)} courses={this.state.courses}/>
				{Object.values(this.state.semesters).map((sem, index) => {
					return <Semester key={sem.id} sem={sem} courses={this.state.courses} />
				})}
				<div className="catalog">Major catalog here</div>
			</div>
		</DragDropContext>
	)}
}

/* I'm not sure if this function is declared in the correct space
*  It seems like I shouldn't need to pass through the state, but
*  if declared inside the class, it's not getting hoisted properly
*  to be used in render()
*/
const generateAvailableCourses = (state) => {
	var availableCourses = Object.keys(state.courses);
	for(const sem of Object.values(state.semesters)){
		for(const courseId of sem.courseIds){
			availableCourses = availableCourses.filter(e => e !== courseId);
		}
	}
	return availableCourses;
}

ReactDOM.render(<App />, document.getElementById('root'));
