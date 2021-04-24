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

	constructor(props) {
		super(props)
		axios.get('/courses').then(ref => {
			const allCourses = {};
			for(const course of ref.data){
				allCourses[course.course_id] = course
			}
			this.setState({
				courses: allCourses,
				availableCourses: ref.data.map(c => c.course_id)
			})
		})
	}

	onDragEnd = result => {
		const { destination: destin, source, draggableId } = result;

		if(!destin) return;

		const newState = Object.assign({}, this.state);

		// Optional chaining (?.) to comply with a course being dropped
		// into the availableCourses field
		newState.semesters[source.droppableId]?.courseIds.splice(source.index, 1);
		newState.semesters[destin.droppableId]?.courseIds.splice(destin.index, 0, draggableId);

		this.setState(newState);
	}

	render() { return (
		<DragDropContext onDragEnd={this.onDragEnd}>
			<div className="gridContainer">
				<div className="ribbon">
					This is the ribbon
					<button onClick={() => loadFromDb( ref => {
						console.log(this.state.availableCourses)
						this.setState({
							availableCourses: ref.data.map(c => c.course_id)
						})
						console.log(this.state.availableCourses)
					})}> Load </button>
				</div>
				<AvailableCourses state={this.state}/>
				{Object.values(this.state.semesters).map((sem, index) => {
					return <Semester key={sem.id} sem={sem} courses={this.state.courses} />
				})}
				<div className="catalog">Major catalog here</div>
			</div>
		</DragDropContext>
	)}
}

const loadFromDb = (cb) => {
	axios.get('/courses')
		.then(cb)
}

ReactDOM.render(<App />, document.getElementById('root'));
