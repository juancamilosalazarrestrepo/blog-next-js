// dependencies

import Link, { LinkProps } from "next/link";
import { text } from "stream/consumers";
import Image from "next/image"
 
const CustomLink = (props: React.ComponentProps<"a"> & LinkProps) => {
  const href = props.href;
  const isInternalLink =
    href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} >
        {href}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  a:CustomLink,
  Image,
  Link
};

export default MDXComponents;
