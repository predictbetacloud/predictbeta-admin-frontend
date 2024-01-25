import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import { P } from "../components/Texts";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<section className="w-screen h-screen bg-[#E1E7EC] flex flex-col items-center justify-center">
			<h1 className="font-bold text-3xl mb-2">You appear lost</h1>
			<P className="">It seems you entered an invalid URL, do not worry!</P>
			<P className="">It happens to everyone at one point or the other</P>

			<Button title="Retrace my steps" className="mt-10" onClick={() => navigate(-1)} />
		</section>
	);
};

export default NotFound;
