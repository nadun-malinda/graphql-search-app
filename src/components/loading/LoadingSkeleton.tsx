export function LoadingSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 w-full">
      {[...Array(16)].map((_, index) => (
        <li key={index} className="relative animate-pulse">
          <div className="aspect-square max-h-[150px] w-full overflow-hidden rounded-md bg-gray-300 border-4 border-gray-500"></div>
        </li>
      ))}
    </ul>
  );
}
