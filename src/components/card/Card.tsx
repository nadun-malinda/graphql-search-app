import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="border-4 border-cyan-400 hover:ring-4 transition-all rounded-md p-3 bg-white min-h-[150px] flex flex-col justify-between">
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: CardProps) {
  return (
    <h3 className="text-lg mb-4 border-b-2 border-cyan-600 break-words">
      {children}
    </h3>
  );
};

Card.Content = function CardContent({ children }: CardProps) {
  return <div className="h-full mb-4">{children}</div>;
};

Card.Link = function CardLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="underline text-cyan-700">
      {children}
    </Link>
  );
};
