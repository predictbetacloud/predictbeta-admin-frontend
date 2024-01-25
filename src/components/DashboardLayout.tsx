import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = { children: ReactNode; title: string };

const DashboardLayout = ({ children, title }: Props) => {
	return (
		<section className="flex">
			<Sidebar />
			<main className="flex-grow">
				<Header title={title} />
				{children}
			</main>
		</section>
	);
};

export default DashboardLayout;
