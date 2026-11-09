interface MyCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function MyCard({ children, className = "" }: MyCardProps) {
  return (
    <div className={`rounded-md p-5 border-2 ${className}`}>{children}</div>
  );
}
