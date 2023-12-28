/**
 * Component to display a message when there are no search results.
 *
 * @returns {JSX.Element} - The JSX element representing the NoResults component.
 */
export function NoResults(): JSX.Element {
  return (
    <h2 className="text-lg text-white">
      No repositories match the query. Please try something else.
    </h2>
  );
}
