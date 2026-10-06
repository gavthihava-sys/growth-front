import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <main>
        <section className="warm-grid relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-24">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300 bg-lime-100 px-3 py-1 text-sm font-medium text-stone-500">
                <Sparkles size={15} /> SEO, GEO & AEO intelligence
              </p>
              <h1 className="display-type max-w-3xl text-[clamp(3.7rem,9vw,8.25rem)] font-normal leading-[.86]">
                Grow where your customers discover you.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-stone-700">
                Growth OS turns website data into clear SEO, AI-search
                visibility, and answer-engine actions—without changing your site
                unless you approve it.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-semibold text-white hover:bg-ink"
                >
                  Start your audit <ArrowRight size={18} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-12 items-center rounded-full border border-ink px-6 py-3 font-semibold"
                >
                  View dashboard
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-stone-200 bg-ink p-6 text-white shadow-2xl">
              <div className="flex justify-between text-sm text-stone-100/70">
                <span>Acme Dental</span>
                <span>Updated today</span>
              </div>
              <p className="mt-7 text-sm font-medium text-stone-100/70">
                YOUR ONLINE GROWTH SCORE
              </p>
              <p className="mt-1 text-6xl font-bold">
                72<span className="text-2xl text-stone-100/50">/100</span>
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["SEO", "71"],
                  ["GEO", "63"],
                  ["AEO", "68"],
                  ["Health", "78"],
                ].map(([name, value]) => (
                  <div key={name} className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm text-stone-100/70">{name}</p>
                    <p className="mt-2 text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-white py-20 text-ink">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-semibold text-stone-500">ONE GROWTH WORKSPACE</p>
            <h2 className="display-type mt-3 max-w-2xl text-5xl font-normal">
              From technical fixes to AI-search opportunities.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                [
                  "SEO intelligence",
                  "Technical audits, content quality, internal links, indexability, and Core Web Vitals.",
                ],
                [
                  "GEO & AEO",
                  "Improve entity signals, content depth, answers, schema, and citation opportunities.",
                ],
                [
                  "Controlled automation",
                  "Review every recommendation before a live site change is made.",
                ],
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-stone-200 p-6"
                >
                  <CheckCircle2 className="text-stone-500" />
                  <h3 className="mt-5 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="safety"
          className="bg-ink px-6 py-20 text-center text-white"
        >
          <ShieldCheck className="mx-auto text-lime-200" size={34} />
          <h2 className="display-type mt-4 text-5xl font-normal">
            You stay in control.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-100/75">
            Manual Approval Mode is the default. Growth OS creates
            evidence-backed drafts and recommendations, but never modifies a
            live website without explicit permission.
          </p>
        </section>
      </main>
    </MainLayout>
  );
}
