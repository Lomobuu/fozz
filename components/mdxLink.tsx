import React, { FC, PropsWithChildren } from "react";

interface MDXLinkProps {
  href: string;
  className?: string;
}

/**
 * Custom Link component for MDX links.
 * Adds Tailwind styling and opens external links in a new tab.
 */
const MDXLink: FC<PropsWithChildren<MDXLinkProps>> = ({
  href,
  children,
  className = "",
}) => {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={`text-blue-600 hover:text-blue-800 underline font-medium transition ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

export default MDXLink;
