import { FC } from "react";

interface Props {
  type?: string;
  message: string;
}

const ErrorMessage: FC<Props> = ({ type = "line", message }) => {
  return (
    <>
      {type === "block" ? (
        <div className="text-xs bg-red-500 text-white rounded-lg p-2 mb-4">
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <p className="text-xs text-red-500 mb-4">{message}</p>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
