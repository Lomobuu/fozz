import React, { FC, PropsWithChildren } from "react";

interface ListProps {
  type?: "ordered" | "unordered";
  className?: string;
}

/**
 * List component that handles both ordered and unordered lists.
 * It also applies Tailwind styling and spacing.
 */
export const List: FC<PropsWithChildren<ListProps>> = ({
  type = "unordered",
  className = "",
  children,
}) => {
  const Component = type === "ordered" ? "ol" : "ul";

  return (
    <Component
      className={`${type === "ordered" ? "list-decimal" : "list-disc"} list-inside mb-4 ${className}`}
    >
      {children}
    </Component>
  );
};

/**
 * ListItem component for proper spacing inside lists.
 */
export const ListItem: FC<PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => {
  return <li className={`mb-1 ${className}`}>{children}</li>;
};
