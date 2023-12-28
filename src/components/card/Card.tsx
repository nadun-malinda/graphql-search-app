import { ReactNode } from "react";

/**
 * Interface for Card component properties.
 *
 * @interface
 * @property {ReactNode} children - The content of the Card.
 */
interface CardProps {
  children: ReactNode;
}

/**
 * Card component for organizing content.
 *
 * @param {CardProps} props - The input props.
 * @returns {JSX.Element} - The JSX element representing the Card component.
 */
export function Card({ children }: CardProps): JSX.Element {
  return (
    <div className="border border-gray-600 shadow-react-deep-slate hover:ring-2 transition-all rounded-xl p-5 bg-react-dark h-full flex flex-col justify-between text-white">
      {children}
    </div>
  );
}

/**
 * Header component for the Card.
 *
 * @param {CardProps} props - The input props.
 * @returns {JSX.Element} - The JSX element representing the Card Header.
 */
Card.Header = function CardHeader({ children }: CardProps): JSX.Element {
  return <h3 className="text-xl mb-4 break-words font-semibold">{children}</h3>;
};

/**
 * Content component for the Card.
 *
 * @param {CardProps} props - The input props.
 * @returns {JSX.Element} - The JSX element representing the Card Content.
 */
Card.Content = function CardContent({ children }: CardProps): JSX.Element {
  return <div className="h-full mb-6">{children}</div>;
};

/**
 * Footer component for the Card.
 *
 * @param {CardProps} props - The input props.
 * @returns {JSX.Element} - The JSX element representing the Card Footer.
 */
Card.Footer = function CardFooter({ children }: CardProps): JSX.Element {
  return <>{children}</>;
};
