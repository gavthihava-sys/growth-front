export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold text-stone-500">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
