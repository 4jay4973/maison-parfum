import Image, { ImageProps } from "next/image";

type ProductImageProps = Omit<ImageProps, "unoptimized">;

export default function ProductImage(props: ProductImageProps) {
  return <Image {...props} unoptimized />;
}
