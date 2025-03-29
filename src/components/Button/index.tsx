import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
  // onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  className,
  //onClick,
  children,
  ...props
}: Props) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
