import React from 'react';

export default class MajorCatalog extends React.Component {
	expandSection(section, depth=0){

		const childrenSections = section.sections?.map(s => this.expandSection(s, depth+1));
		let isSatisfied = true;
		childrenSections?.forEach(c => isSatisfied = isSatisfied && c.isSatisfied)
		// TODO: check validCourses against enrolled courses
		let enrolledHours = 0;
		section.validCourses?.forEach(set => {
			for(const course of set){
				if(this.props.enrolledCourses.has(course)){
					enrolledHours += 3;
					break;
				}
			}
		});
		if(enrolledHours < section.minHours) isSatisfied = false;

		return ({
			isSatisfied: isSatisfied,
			display: [
				<div
					className={"catalogSection" + (isSatisfied ? "" : " isInvalid")}
					key={section.title}
					style={{marginLeft: depth*16, paddingLeft: 8}}
				>
					{section.title}
				</div>,
				childrenSections?.map(c => c.display)
			]
		})
	}
	render() { return (
		<div className="catalog">
			{this.expandSection(this.props.catalog).display}
		</div>
	)}
}
