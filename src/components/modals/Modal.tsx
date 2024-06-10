import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircleSharp } from "react-icons/io5";

type Props = {
	isOpen: boolean;
	closeModal: () => void;
	content: ReactNode;
	title: string | ReactNode;
};

const Modal = ({ isOpen, closeModal, content, title }: Props) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-[100]" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/50" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
								<div className="flex items-center justify-between pb-4 mb-6 border-b border-b-[#E1E7EC]">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium text-[#2A2E33]"
									>
										{title ?? ""}
									</Dialog.Title>
									<button onClick={closeModal} type="button">
										<IoCloseCircleSharp size={24} color="#8C97A7" />
									</button>
								</div>
								{content}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;
