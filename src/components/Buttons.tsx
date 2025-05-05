import styled from "styled-components";
import { RiLoader5Fill } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";

import { ButtonType } from "../types/types";

const ButtonStyle = styled.button`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const PrimaryStyle = styled(ButtonStyle)`
  background-color: #eb1536;
  border-radius: 8px;

  &:hover {
    background-color: #eb1536ee;
  }

  &:disabled {
    background-color: #eb153640;
  }
`;

function Button({
  title,
  type = "button",
  style,
  className,
  disabled,
  loading,
  content,
  onClick = () => {},
}: ButtonType) {
  return (
    <PrimaryStyle
      type={type}
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        "py-2 px-4 flex justify-center items-center text-white text-center rounded-sm " +
        className
      }
    >
      <span>
        {title ?? "Title"} {content ?? null}{" "}
      </span>
      {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
    </PrimaryStyle>
  );
}

Button.Blue = ({
  title,
  type = "button",
  style,
  className,
  disabled,
  loading,
  content,
  onClick = () => {},
}: ButtonType) => {
  return (
    <ButtonStyle
      type={type}
      style={style}
      onClick={() => onClick()}
      disabled={disabled}
      className={
        "py-2 px-4 bg-[#051B30] space-x-4 hover:bg-[#051B30aa] text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
    >
      <span className="text-[#B8C4CE]">
        {title ?? "Title"} {content ?? null}{" "}
      </span>
      {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
    </ButtonStyle>
  );
};

Button.Outline = ({
  title,
  type = "button",
  style,
  className,
  disabled,
  loading,
  content,
  onClick = () => {},
}: ButtonType) => {
  return (
    <ButtonStyle
      type={type}
      style={style}
      onClick={() => onClick()}
      disabled={disabled}
      className={
        "py-2 px-4 bg-[#F5F8FA] border border-[#E1E7EC] space-x-4 hover:bg-[##F5F8FAaa] text-center rounded disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
    >
      <span className="text-[#6D7786] font-medium">
        {title ?? "Title"} {content ?? null}{" "}
      </span>
      {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
    </ButtonStyle>
  );
};

Button.GoBack = ({
  title,
  type = "button",
  style,
  className,
  disabled,
  loading,
  content,
  onClick = () => {},
}: ButtonType) => {
  return (
    <ButtonStyle
      type={type}
      style={style}
      onClick={() => onClick()}
      disabled={disabled}
      className={
        "bg-transparent space-x-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
    >
      <span className="text-[#222222] flex items-center gap-x-2">
        <TiArrowBackOutline className="" />
        {title ?? "Back"} {content ?? null}{" "}
      </span>
      {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
    </ButtonStyle>
  );
};

export default Button;
