interface MyBlogCardProps {
  className?: string;
  image?: string;
  alt?: string;
  title: string;
}

export default function MyBlogCard({
  className = "",
  image = "",
  alt = "",
  title,
}: MyBlogCardProps) {
  return (
    <div className={`${className}`}>
      <div className="rounded-xl">
        {image != "" ? <img src={image} alt={alt} /> : null}
      </div>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
}
