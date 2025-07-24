import { useEffect, useRef, useMemo } from 'react'

type AnyFunction = (...args: any[]) => any

export function useDebouncedCallback<T extends AnyFunction>(
	callback: T,
	delay: number
) {
	const callbackRef = useRef<T>(callback)

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined
	)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const cancel = useMemo(
		() => () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		},
		[]
	)

	const debouncedCallback = useMemo(() => {
		const func: T = ((...args: Parameters<T>) => {
			cancel()
			timeoutRef.current = setTimeout(() => {
				callbackRef.current(...args)
			}, delay)
		}) as T
		return func
	}, [delay, cancel])

	useEffect(() => {
		return () => {
			cancel()
		}
	}, [cancel])

	return [debouncedCallback, cancel] as const
}
