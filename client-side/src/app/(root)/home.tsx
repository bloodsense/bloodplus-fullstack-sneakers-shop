interface Props {
	className?: string
}

export const Home: React.FC<Props> = ({ className }) => {
	return <div className={className}>Home Component</div>
}
