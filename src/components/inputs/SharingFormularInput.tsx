import { forwardRef, useEffect } from "react";
import { Input } from "./Input";
import { numberToOrdinal } from "../../utils/utils";
import ErrorMessage from "./ErrorMessage";
import { FieldErrors, FieldValues } from "react-hook-form";

type InputProps = {
	position: number;
	errors: FieldErrors<FieldValues>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	unregister: (name: string | string[], options?: any) => void;
};

const SharingFormularInput = forwardRef<HTMLInputElement, InputProps>(
	({ position, errors, unregister, ...rest }, ref) => {
		useEffect(() => {
			return () => {
				unregister(`position-${position}`);
			};
		}, []);

		return (
			<>
				<label htmlFor={`position-${position}`} className="mb-1 block">
					<p className="text-[#222222] text-sm">
						{numberToOrdinal(position)} position
					</p>
				</label>
				<Input
					id={`position-${position}`}
					type="number"
					placeholder="25%"
					ref={ref}
					{...rest}
					className={`w-full input ${
						errors?.[`position-${position}`] ? "invalid" : ""
					}`}
				/>
				{errors?.[`position-${position}`] && (
					<ErrorMessage
						message={errors[`position-${position}`]?.message?.toString()}
					/>
				)}
			</>
		);
	}
);

export default SharingFormularInput;
