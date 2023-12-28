export function LoadingSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
      {[...Array(16)].map((_, index) => (
        <li key={index} className="relative animate-pulse">
          <div className="aspect-square max-h-[240px] w-full overflow-hidden rounded-xl bg-gray-300 border border-gray-500 p-5">
            <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-400 mb-3" />
            <div className="flex flex-row gap-2 items-center mb-1">
              <div className="w-5 h-5 rounded-full bg-gray-400" />
              <p className="h-2.5 w-1/2 rounded-lg bg-gray-400" />
            </div>
            <div>
              <p className="mt-2 h-2 w-full rounded-lg bg-gray-400 mb-3" />
              <p className="mt-2 h-2 w-full rounded-lg bg-gray-400 mb-3" />
              <p className="mt-2 h-2 w-3/4 rounded-lg bg-gray-400 mb-3" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
