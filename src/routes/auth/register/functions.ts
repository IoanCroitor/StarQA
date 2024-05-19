export function calculateStrength(password: string) {
	let score: number = 0;
	if (!password) return 0;
	if (password.length >= 8) score += 25;
	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
	if (/\d/.test(password)) score += 20;
	if (/[\W_]/.test(password)) score += 20;
	if (password.length >= 12) score += 15;
	return score;
}

export function progressColorFunction(
	arePasswordsMathing: boolean,
	passwordConfirm: string,
	strength: number
) {
	if (passwordConfirm === '') {
		return 'bg-primary';
	} else if (!arePasswordsMathing) {
		return 'bg-red-400';
	}
	if (strength === 100) return 'bg-green-400';
	return 'bg-primary';
}
