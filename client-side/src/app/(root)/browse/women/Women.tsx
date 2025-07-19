'use client'

import { BrowseSneakersList } from '@/components/browse-sneakers-list'
import { Container } from '@/components/container'
import React from 'react'

export const Women = () => {
	return (
		<Container>
			<BrowseSneakersList gender="women" />
		</Container>
	)
}
