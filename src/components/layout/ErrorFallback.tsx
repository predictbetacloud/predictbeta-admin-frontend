import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
	const navigate = useNavigate();

	return (
		<section className="w-screen h-screen bg-[#E1E7EC] flex items-center justify-center">
			<div>
				<h1 className="font-bold text-3xl text-center mb-2 ">
					An error occured
				</h1>
				<p className="text-center">
					It's not you, please
					<button
						className="inline text-[#eb1536] mx-2 rounded"
						onClick={() => {
							navigate("/dashboard/fixtures");
							resetErrorBoundary();
						}}
					>
						REFRESH
					</button>
					and if the issue persists, send us an{" "}
					<a
						href="mailto:Support@myPredictBeta.com"
						className="underline-offset-2 hover:underline-offset-4 underline transition duration-300 ease-in-out"
					>
						email
					</a>
				</p>
			</div>
		</section>
	);
};

export default ErrorFallback;
