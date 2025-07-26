'use client'

import { Input } from './ui/form/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { PUBLIC_URL } from '@/config/urls.constants'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!searchTerm.trim()) return

		router.push(PUBLIC_URL.sneakers.search(searchTerm))
		setSearchTerm('')
	}

	return (
		<div className={`relative ${className || ''}`}>
			<form onSubmit={handleSearchSubmit} className="flex mr-10">
				<Input
					placeholder="Поиск по сайту"
					className="w-153 rounded-r-none"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					autoComplete="off"
				/>
				<Button
					type="submit"
					variant="outline"
					className="border-l-0 rounded-l-none bg-foreground/15 hover:bg-foreground/18"
				>
					<Search className="text-white" />
				</Button>
			</form>
		</div>
	)
}
