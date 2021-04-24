import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import logo from './UCM logo darkmode.png';
import userIcon from './user.svg';

import initialData from './initialData';
import Semester from './semester';
import AvailableCourses from './availableCourses';
import { DragDropContext } from 'react-beautiful-dnd';

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

	searchCB = search => {
		search = search.target.value.toLowerCase();
		let courses = Object.values(this.state.courses).map(c => c.course_id);
		courses = courses.filter(c => c.toLowerCase().includes(search))
		console.log(courses)
		this.setState({
			availableCourses: courses
		})
	}

	render() { return (
		<DragDropContext onDragEnd={this.onDragEnd}>
			<div className="gridContainer">
				<div className="ribbon">
					<img src={logo} alt="UCM Logo" height='100%'/>
					<div className="ribbonFiller"/>
					<div style={{'padding': '8px'}}>John Doe</div>
					<img src={userIcon} alt="User Icon" height='80%' style={{'WebkitFilter': 'invert(1)'}}/>
				</div>
				<AvailableCourses state={this.state} searchCB={this.searchCB}/>
				{Object.values(this.state.semesters).map((sem, index) => {
					return <Semester key={sem.id} sem={sem} courses={this.state.courses}/>
				})}
				<div className="catalog">Major catalog here</div>
			</div>
		</DragDropContext>
	)}
}

ReactDOM.render(<App />, document.getElementById('root'));
