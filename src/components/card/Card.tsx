import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="border border-gray-600 shadow-react-deep-slate hover:ring-4 transition-all rounded-xl p-5 bg-react-dark min-h-[150px] flex flex-col justify-between text-white">
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: CardProps) {
  return <h3 className="text-xl mb-4 break-words font-semibold">{children}</h3>;
};

Card.Content = function CardContent({ children }: CardProps) {
  return <div className="h-full mb-6">{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardProps) {
  return <>{children}</>;
};
