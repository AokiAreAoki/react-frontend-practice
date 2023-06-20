
export interface User {
	id: number
	name: string
	surname: string | null
	email: string | null
}

export interface UserWithRole extends User {
	role: {
		id: number
		name: string
		hasGrades: boolean
		canSeeOthersGrades: boolean
		canEditGrades: boolean
		canEditSemesters: boolean
	}
}