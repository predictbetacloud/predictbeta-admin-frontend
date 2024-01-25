type Props = { title: string };

const Header = ({ title }: Props) => {
	return (
		<header className="bg-[#051B30] py-8 pl-4 sticky top-0">
			<h1 className="text-white font-semibold text-lg">{title}</h1>
		</header>
	);
};

export default Header;
