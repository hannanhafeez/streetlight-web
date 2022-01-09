import { useState } from "react"

export type ErrorMessageState = {
	shown: boolean; message: string;
}

export const useErrorMessage = ()=> {
	const [error, setError] = useState<ErrorMessageState>({shown: false, message: ''})

	const resetMessage = () => setError({shown: false, message:''})

	const showMessageForTime = (msg: string, seconds: number) => {
		setError({shown: true, message: msg})
		setTimeout(resetMessage, seconds * 1000)
	}

	return {
		error, setError, resetMessage, showMessageForTime
	}
}