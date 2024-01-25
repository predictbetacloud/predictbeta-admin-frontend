import { P } from "./Texts";

type Props = {
	message: string | undefined;
};

const ErrorMessage = ({ message }: Props) => {
	return <P className="text-red-400 text-sm mt-1">{message}</P>;
};

export default ErrorMessage;
