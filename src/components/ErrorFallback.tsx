const ErrorFallback = ({
	error,
	resetErrorBoundary,
}: {
	error: unknown;
	resetErrorBoundary: (...args: unknown[]) => void;
}) => {
	return (
		<section className="w-screen h-screen bg-[#E1E7EC] flex items-center justify-center">
			<h1 className="font-bold text-xl">An error occured</h1>
		</section>
	);
};

export default ErrorFallback;
