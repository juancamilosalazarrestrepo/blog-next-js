// dependencies

import Link, { LinkProps } from "next/link";
import { text } from "stream/consumers";
import Image from "next/image";

// Define un componente personalizado para manejar las imágenes
const CustomImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  const imgWidth = width || 300; // Valor predeterminado para width
  const imgHeight = height || 300; // Valor predeterminado para height

  return (
    <div style={{ display:"flex",width:"100%",textAlign: "center",justifyContent:"center" }}>
      <Image
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        className="my-custom-class" // Agrega cualquier clase CSS si es necesario
      />
    </div>
  );
};

const MDXComponents = {

  Image: CustomImage,
  Link,
};

export default MDXComponents;
