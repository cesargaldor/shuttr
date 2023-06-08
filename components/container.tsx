import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className="w-full max-w-[90%] md:max-w-[70%] mx-auto">{children}</div>;
};

export default Container;
