const initialData = {
	courses: {
		'course-1': { id: 'course-1', desc: 'Computers and Modern Society' },
		'course-2': { id: 'course-2', desc: 'Programming I' },
		'course-3': { id: 'course-3', desc: 'Programming II' },
		'course-4': { id: 'course-4', desc: 'Data Structures' },
		'course-5': { id: 'course-5', desc: 'Algorithm Design and Analysis' },
	},
	availableCourses: {
		/* Auto-populated from master course list minus semester course lists on 'boot' */
	},
	semesters: {
		'sem-1': { id: 'sem-1', title: 'Fall 20',   courseIds: ['course-1', 'course-2', 'course-3']},
		'sem-2': { id: 'sem-2', title: 'Spring 21', courseIds: []},
		'sem-3': { id: 'sem-3', title: 'Fall 21',   courseIds: ['course-4']},
		'sem-4': { id: 'sem-4', title: 'Spring 22', courseIds: []},
		'sem-5': { id: 'sem-5', title: 'Fall 22',   courseIds: []},
		'sem-6': { id: 'sem-6', title: 'Spring 23', courseIds: ['course-5']},
		'sem-7': { id: 'sem-7', title: 'Fall 23',   courseIds: []},
		'sem-8': { id: 'sem-8', title: 'Spring 24', courseIds: []},
	},
};

export default initialData;
