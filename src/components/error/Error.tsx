/**
 * Error component to display an error message.
 *
 * @param {Object} props - The input props.
 * @param {string} props.message - The error message to be displayed.
 * @returns {JSX.Element} - The JSX element representing the Error component.
 */
export function Error({ message }: { message: string }): JSX.Element {
  return (
    <div className="flex justify-center items-center w-full">
      <h2 className="text-lg text-white mb-8">{message}</h2>
    </div>
  );
}
