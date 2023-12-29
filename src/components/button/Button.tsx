"use client";

/**
 * Interface for the Button props.
 * @interface
 * @property {string} text - The text to display on the button.
 * @property {boolean} [disabled] - Whether the button is disabled.
 * @property {function} [onClick] - The function to call when the button is clicked.
 */
interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Shared Button component for rendering a button.
 *
 * @param {ButtonProps} props - The input props.
 * @returns {JSX.Element} - The JSX element representing the Button component.
 */
export function Button({ text, disabled, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      className={`rounded-full mb-6 bg-react-dark border border-gray-600 text-white py-2 px-6 ${
        disabled ? "opacity-40 pointer-events-none" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
