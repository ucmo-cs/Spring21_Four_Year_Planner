import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Course extends React.PureComponent {

	static popupCB;

	information() {
		return <div style={{margin: 15}}>
			<div>Course ID: {this.props.id}</div>
			{console.log(this.props.state.prerequisites)}
			<div>Prereqs: {this.props.state.prerequisites[this.props.id]?.map(c => c+" ") ?? "None"}</div>
			<div>Availability: All semesters</div>
			<br/>
			<div>Course Description: Of all the monsters who fill the nightmares of our folklore, none terrify more than werewolves, because they transform unexpectedly from the familiar into horrors. For these, we seek bullets of silver than can magically lay them to rest.</div>
		</div>
	}

	render() {

		let isInvalid = false;
		// only run if state received (does not when in availableCourses)
		if(this.props.shouldValidate && this.props.state){
			const prereqs = new Set(this.props.state.prerequisites[this.props.id]);

			for(const sem of Object.values(this.props.state.semesters)){
				// only search prior semesters
				if(sem.courseIds.includes(this.props.id)){
					break;
				}
				sem.courseIds.forEach(c => prereqs.delete(c))
			}

			if(prereqs.size > 0){
				isInvalid = true;
			}
		}

		return (
			<Draggable draggableId={this.props.id} index={this.props.index}>
				{provided => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						className={"courseLabel informational " + (isInvalid ? "isInvalid" : "")}
					>
						<div style={{
							outline:"1px solid black",
							paddingLeft: "8px",
							paddingRight: 2,
							//fontSize: ".75em"
							display: "flex",
							justifyContent: "space-between",
						}}>
							{this.props.id}
							<button onClick={() => {
								Course.popupCB({
									title: this.props.desc,
									body: this.information(),
								})
							}}><i className="fa fa-info-circle"></i></button>
						</div>
						<div style={{padding: "8px"}}>{this.props.desc}</div>
					</div>
				)}
			</Draggable>
		)
	}
}
