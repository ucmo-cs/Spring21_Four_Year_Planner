const initialData = {
	courses: {},
	availableCourses: [],
	semesters: {
		'sem-1': { id: 'sem-1', title: 'Fall 20',   courseIds: []},
		'sem-2': { id: 'sem-2', title: 'Spring 21', courseIds: []},
		'sem-3': { id: 'sem-3', title: 'Fall 21',   courseIds: []},
		'sem-4': { id: 'sem-4', title: 'Spring 22', courseIds: []},
		'sem-5': { id: 'sem-5', title: 'Fall 22',   courseIds: []},
		'sem-6': { id: 'sem-6', title: 'Spring 23', courseIds: []},
		'sem-7': { id: 'sem-7', title: 'Fall 23',   courseIds: []},
		'sem-8': { id: 'sem-8', title: 'Spring 24', courseIds: []},
	},
	prerequisites: {},
	majorCatalog: {
		title: "Computer Science Major",
		sections: [
			{
				title: "Core classes",
				minHours: 6,//42,
				validCourses: [
					["CS1000"],
					["CS1100"],
					["CS1110"],
					["CS2300"],
					["CS2400"],
					["CS3100"],
					["CS3200"],
					["CS3500"],
					["CS4300"],
					["CS4500"],
					["CS4600"],
					["SE3910"],
					["CYBR3130", "CYBR4820", "CYBR4920"],
					["CS4920", "SE4920"],
				],
			},
			{
				title: "Software dev Option",
				minHours: 42,
				sections: [
					{
						title: "Electives set 1",
						minHours: 12,
						maxHours: 24,
					},
					{
						title: "Electives set 2",
						minHours: 3,
						maxHours: 15,
					},
				]
			},
			{
				title: "Gen Ed",
				minHours: 3,
				maxHours: 15,
			},
		]
	},
	ButtonPopup: false,
};

export default initialData;
