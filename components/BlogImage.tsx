// components/BlogImage.tsx
import Image from "next/image";

export default function BlogImage({
  src,
  alt,
  size = "large",
}: {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
}) {
  const sizeMap = { small: 400, medium: 800, large: 1200 };
  const width = sizeMap[size] ?? sizeMap.large;

  return (
    <div className="flex justify-center my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={Math.floor((width * 2) / 3)}
        className="rounded-lg shadow-md"
      />
    </div>
  );
}
