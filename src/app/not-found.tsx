import Link from "next/link";

/**
 * Page to display when a resource is not found.
 *
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="p-8 border border-gray-600 shadow-react-deep-slate bg-react-dark text-white rounded-md w-full text-center">
      <h1 className="text-xl mb-8">
        Sorry, could nott found requested resource!
      </h1>
      <Link href="/" className="block text-white font-semibold">
        ← Go home
      </Link>
    </div>
  );
}
