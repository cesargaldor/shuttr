"use client";
import { ThemeProvider } from "next-themes";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        enableSystem={false}>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
