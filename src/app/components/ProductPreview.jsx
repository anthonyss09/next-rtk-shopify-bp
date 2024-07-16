import Image from "next/image";

export default function ProductPreview({
  title,
  description,
  price,
  imageUrl,
}) {
  return (
    <aside className="product-preview-main">
      <Image
        priority={true}
        src={imageUrl}
        alt="product preview"
        width={400}
        height={300}
        role="image"
      />
      <p role="p-1">{title}</p>
      <p role="p-2">{description}</p>
    </aside>
  );
}
