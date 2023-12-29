import { ReactNode } from "react";

/**
 * Interface for Card component properties.
 *
 * @interface
 * @property {ReactNode} children - The content of the Card.
 * @property {cssClasses} string - The additional TailwindCss classes to include on the parent Card.
 */
interface CardProps {
  children: ReactNode;
  cssClasses?: string;
}

/**
 * Card component for organizing content.
 *
 * @param {CardProps} props - The input props.
 * @returns {JSX.Element} - The JSX element representing the Card component.
 */
export function Card({ children, cssClasses }: CardProps): JSX.Element {
  return (
    <div
      className={`bg-react-dark border border-gray-600 shadow-react-deep-slate hover:ring-2 transition-all rounded-xl p-5 h-full flex flex-col justify-between text-white ${cssClasses}`}
    >
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
