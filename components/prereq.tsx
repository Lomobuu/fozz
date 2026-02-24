import Link from "next/link";

type Article = {
  title: string;
  href: string;
  description: string;
};

export default function Prerequisites({
  articles,
}: {
  articles: Article[];
}) {
  return (
    <div className="my-10 rounded-2xl border bg-gray-50 p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        Required Setup
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group block rounded-xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {article.description}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-blue-600 group-hover:underline">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}