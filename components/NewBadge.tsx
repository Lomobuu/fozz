// components/NewBadge.tsx
export default function NewBadge() {
  return (
    <span
      className="inline-block align-middle mr-3 px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-white rounded-full shadow-lg animate-pulse"
      style={{
        background: "linear-gradient(90deg, #f43f5e, #f97316, #eab308)",
      }}
    >
      New
    </span>
  );
}