import { FC, ReactNode } from 'react'

export const CharacteristicRow: FC<{ label: string; value: ReactNode }> = ({
	label,
	value,
}) => (
	<div className="grid grid-cols-2 items-center border-t border-border/60 py-3 text-sm">
		<p className="text-foreground/60">{label}</p>
		<p>{value || 'Отсутствует'}</p>
	</div>
)
