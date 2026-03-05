import React, { FC, PropsWithChildren, ReactNode } from "react";

interface ListProps {
  type?: "ordered" | "unordered";
  className?: string;
  children: ReactNode;
}

/**
 * List component that handles both ordered and unordered lists.
 * Supports nested lists automatically.
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
 * Detects if children contain a nested <ul> or <ol> and adds margin accordingly.
 */
export const ListItem: FC<PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => {
  return (
    <li className={`mb-2 ml-4 ${className}`}>
      {children}
    </li>
  );
};