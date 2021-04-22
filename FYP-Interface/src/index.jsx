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
			this.setState({
				availableCourses: ref.data.map(c => c.course_id)
			})
			console.log(this.state.availableCourses)
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
					<button onClick={() =>
						this.setState({
							availableCourses: ['CS3200', 'CS101', 'CS4900', 'CS1020', 'course-5', 'course-6', 'course-7', 'course-8', 'course-9', 'CS32000', 'CS32001', 'CS32002', 'CS32003', 'CS32004', 'CS32005', 'CS32006', 'CS32007', 'CS32008']
						}
					)}> Revert </button>
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
