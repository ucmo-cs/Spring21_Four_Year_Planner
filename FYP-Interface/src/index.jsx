import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './initialData';
import Semester from './semester';
import AvailableCourses from './availableCourses';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

class App extends React.Component {
	state = initialData;

	onDragEnd = result => {
		const { destination, source, draggableId } = result;

		if(!destination) return;

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

	generateAvailableCourses() {
		var availableCourses = Object.keys(this.state.courses);
		axios.get('/courses').then(ref => console.log(ref.data));
		console.log(availableCourses);
		for(const sem of Object.values(this.state.semesters)){
			for(const courseId of sem.courseIds){
				availableCourses = availableCourses.filter(e => e !== courseId);
			}
		}
		return availableCourses;
	}

	render() { return (
		<DragDropContext onDragEnd={this.onDragEnd}>
			<div className="gridContainer">
				<div className="ribbon">This is the ribbon</div>
				<AvailableCourses courseIds={this.generateAvailableCourses()} courses={this.state.courses}/>
				{Object.values(this.state.semesters).map((sem, index) => {
					return <Semester key={sem.id} sem={sem} courses={this.state.courses} />
				})}
				<div className="catalog">Major catalog here</div>
			</div>
		</DragDropContext>
	)}
}

ReactDOM.render(<App />, document.getElementById('root'));
