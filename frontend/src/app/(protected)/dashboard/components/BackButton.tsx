import Link from "next/link";

export function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-slate-200 hover:text-white font-medium transition-colors duration-200 text-sm"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Volver al inicio
    </Link>
  );
}
