/* eslint-disable no-empty-pattern */
import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

interface OptionType {
	value: string | number;
	name: string;
}

const CustomListBox = ({
	defaultOption,
	options,
	title,
	onChange = () => {},
	icon,
	loading,
}: {
	defaultOption?: string;
	options: OptionType[];
	onChange: (value: string) => void;
	title: string;
	icon?: React.ReactElement;
	loading?: boolean;
}) => {
	const checkedDefaultOption = options.find(
		(option) => option.value === defaultOption
	);

	const [selected, setSelected] = useState<OptionType | null>(
		checkedDefaultOption ?? null
	);

	useMemo(() => {
		if (!defaultOption) {
			setSelected(null);
		} else {
			setSelected(checkedDefaultOption ? checkedDefaultOption : null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultOption]);

	useEffect(() => {
		if (selected !== null) {
			onChange(String(selected.value));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	return (
		// <div className="fixed top-16 w-72">
		<Listbox value={selected} onChange={setSelected}>
			<div className="relative mt-1">
				<Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#F5F8FA] p-3 pr-10 text-left border-[#E1E7EC] border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 sm:text-sm">
					{loading ? (
						<AiOutlineLoading
							className="animate-spin"
							color="#5D65F6"
							size={32}
						/>
					) : (
						<span className="text-sm text-[#6D7786] font-medium flex items-center truncate gap-3">
							{icon ?? null}
							{selected?.name ? selected?.name : title}
						</span>
					)}

					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<FaCaretDown
							color="#6D7786"
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-t-none rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{options.map((option, optionIdx) => (
							<Listbox.Option
								key={optionIdx}
								className={({ active }) =>
									`relative cursor-default select-none ${
										active ? "bg-[#f4f4f6]" : "text-gray-900"
									}`
								}
								value={option}
							>
								{({}) => (
									<>
										<span
											className={`block truncate  px-4 py-2 ${
												selected?.value === option.value
													? "font-medium text-[#2A2E33] bg-[#f4f4f6]"
													: " text-[#8C97A7]"
											}`}
										>
											{option.name}
										</span>
										{/* {selected?.value === option.value ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiCheck
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckBoxIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    )} */}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
		// </div>
	);
};

export default CustomListBox;
