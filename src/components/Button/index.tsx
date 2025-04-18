import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
  children: ReactNode;
}

export default function Button({
  className,
  children,
  variant = "primary",
  size = "medium",
  ...props
}: Props) {
  const baseClass = "rounded-lg cursor-pointer";

  const variantClasses = {
    primary: "bg-[#B8E986] hover:bg-[#A3D375] text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const disabledClass = props.disabled
    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
    : "";

  const buttonClass = `${baseClass} ${variantClasses[variant]} ${
    sizeClasses[size]
  } ${disabledClass} ${className || ""}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
