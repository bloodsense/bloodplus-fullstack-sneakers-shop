'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export const useReviewForm = (
	initialText: string = '',
	initialRating: number = 0
) => {
	const [text, setText] = useState(initialText)
	const [rating, setRating] = useState(initialRating)
	const [hoverRating, setHoverRating] = useState(0)

	const validate = () => {
		if (!rating) {
			toast.error('Пожалуйста, поставьте оценку')
			return false
		}
		if (!text.trim()) {
			toast.error('Пожалуйста, напишите текст Вашего отзыва')
			return false
		}
		return true
	}

	const reset = () => {
		setText('')
		setRating(0)
	}

	return {
		text,
		setText,
		rating,
		setRating,
		hoverRating,
		setHoverRating,
		validate,
		reset,
	}
}
