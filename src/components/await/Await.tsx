/**
 * Asynchronously waits for a Promise to resolve and renders the specified children component with the resolved value.
 *
 * @template T - The type of the Promise's resolved value.
 * @param {Object} props - The input props.
 * @param {Promise<T>} props.promise - The Promise to wait for.
 * @param {(value: T) => JSX.Element} props.children - A function that takes the resolved value and returns a JSX element.
 * @returns {Promise<JSX.Element>} - A Promise containing the JSX element rendered by the children function with the resolved value.
 */
export async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}): Promise<JSX.Element> {
  const data = await promise;
  return children(data);
}
