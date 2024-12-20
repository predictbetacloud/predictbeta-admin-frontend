import { AiOutlineLoading } from "react-icons/ai";

const PageLoading = () => {
	return (
		<div className="flex items-center justify-center h-full w-full min-h-52 md:min-h-80">
			<AiOutlineLoading className="animate-spin" color="#5D65F6" size={32} />
		</div>
	);
};

export default PageLoading;
