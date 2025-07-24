import { useState, useEffect } from 'react'

function useLocalStorageState<T>(
	key: string,
	defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState<T>(defaultValue)

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item !== null) {
				setValue(JSON.parse(item))
			}
		} catch (error) {
			console.warn(`Ошибка при чтении localStorage “${key}”:`, error)
		}
	}, [key])

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.warn(`Ошибка записи в localStorage “${key}”:`, error)
		}
	}, [key, value])

	return [value, setValue]
}

export default useLocalStorageState
