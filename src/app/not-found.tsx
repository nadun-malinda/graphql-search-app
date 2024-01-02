import { NOT_FOUND_MESSAGE } from "@/constants";
import Link from "next/link";
import { Error } from "@/components/error";

/**
 * Page to display when a resource is not found.
 *
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="p-8 border border-gray-600 shadow-react-deep-slate bg-react-dark text-white rounded-md w-full">
      <Link href="/" className="block text-white font-semibold mb-8">
        ← Home
      </Link>
      <Error message={NOT_FOUND_MESSAGE} />
    </div>
  );
}
