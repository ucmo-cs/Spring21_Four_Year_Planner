import React from 'react';

export default class MajorCatalog extends React.Component {
	expandSection(section, depth){ return (
		<div key={section.title}>
			<div className="catalogSection" style={{marginLeft: depth*16, paddingLeft: 8}}>
				{section.title}
			</div>
			{section.sections?.map(s => this.expandSection(s, depth+1))}
		</div>
	)}
	render() { return (
		<div className="catalog">
			{this.expandSection(this.props.catalog, 0)}
		</div>
	)}
}
