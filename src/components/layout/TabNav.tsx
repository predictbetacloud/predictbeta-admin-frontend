/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

interface TabType {
	path: string;
	title?: string;
	content?: React.ReactElement;
}

const TabNav = ({
	tabs,
	className,
	hasAction,
	onClick,
}: {
	tabs: TabType[];
	className?: string;
	hasAction?: boolean;
	onClick?: (value: string) => void;
}) => {
	const pageLink = window.location.pathname;

	return (
		<nav className="flex space-x-2 rounded-sm w-full md:w-fit">
			{hasAction ? (
				<>
					{tabs.map((tab, key) => (
						<button
							type="button"
							onClick={() =>
								onClick && typeof onClick === "function"
									? onClick(tab.path)
									: {}
							}
							key={key}
							className=" block border-gray-100 border-b md:border-b-0 w-full md:w-fit"
						>
							<li
								className={
									pageLink === tab.path
										? "pb-2 font-medium border-b-2 focus:outline-blue-300 border-[#EB1536] list-none text-center cursor-pointer w-fit " +
										  className
										: "pb-2 text-[#8C97A7] border-b-2 border-transparent list-none text-center cursor-pointer w-fit " +
										  className
								}
							>
								{tab.title ?? null}
								{tab.content ?? null}
							</li>
						</button>
					))}
				</>
			) : (
				<>
					{tabs.map((tab, key) => (
						<Link key={key} to={tab.path}>
							<li
								className={
									pageLink === tab.path
										? "pb-2 text-[#2A2E33] font-medium border-b-2 focus:outline-blue-300 border-[#EB1536] list-none text-center cursor-pointer" +
										  className
										: "pb-2 text-[#8C97A7] border-b-2 border-transparent list-none text-center cursor-pointer " +
										  className
								}
							>
								{tab.title ?? null}
								{tab.content ?? null}
							</li>
						</Link>
					))}
				</>
			)}
		</nav>
	);
};

export const TabNavAction = ({
	tabs,
	className,
	onClick,
}: {
	tabs: TabType[];
	onClick: (value: string) => void;
	className?: string;
}) => {
	const l = useLocation();
	const queries = queryString.parse(l.search);
	const pageLink = queries?.visibility;

	return (
		<nav className="flex space-x-10 rounded-sm">
			{tabs.map((tab, key) => (
				<button type="button" onClick={() => onClick(tab.path)} key={key}>
					<li
						className={
							pageLink === tab.path
								? "py-2.5 text-[#2A2E33] font-medium border-b-2 focus:outline-blue-300 border-[#EB1536] list-none text-center cursor-pointer" +
								  className
								: "py-2.5 text-[#8C97A7] border-b-2 border-transparent list-none text-center cursor-pointer " +
								  className
						}
					>
						{tab.title ?? null}
						{tab.content ?? null}
					</li>
				</button>
			))}
		</nav>
	);
};

export default TabNav;
