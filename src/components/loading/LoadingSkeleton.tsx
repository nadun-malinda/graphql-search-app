/**
 * Interface for the LoadingSkeleton component props.
 * @interface
 * @property {number} numberOfItem - The number of items to display in the loading skeleton.
 */
interface LoadingSkeletonProps {
  numberOfItem?: number;
}

/**
 * LoadingSkeleton component to display a skeleton loading state.
 *
 * @returns {JSX.Element} - The JSX element representing the LoadingSkeleton component.
 */
export function LoadingSkeleton({
  numberOfItem = 10,
}: LoadingSkeletonProps): JSX.Element {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
      {[...Array(numberOfItem)].map((_, index) => (
        <li key={index} className="relative animate-pulse">
          <div className="aspect-square max-h-[240px] w-full overflow-hidden rounded-xl bg-react-dark border border-gray-500 p-5">
            <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-400 mb-3" />
            <div className="flex flex-row gap-2 items-center mb-1">
              <div className="w-5 h-5 rounded-full bg-gray-400" />
              <p className="h-2.5 w-1/2 rounded-lg bg-gray-400" />
            </div>
            <div className="mb-8">
              <p className="mt-2 h-2 w-full rounded-lg bg-gray-400 mb-3" />
              <p className="mt-2 h-2 w-full rounded-lg bg-gray-400 mb-3" />
              <p className="mt-2 h-2 w-3/4 rounded-lg bg-gray-400 mb-3" />
            </div>

            <p className="mt-2 h-2 w-3/4 rounded-lg bg-gray-400 mb-3" />
          </div>
        </li>
      ))}
    </ul>
  );
}
