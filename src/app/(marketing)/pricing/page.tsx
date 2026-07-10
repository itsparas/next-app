export default function PricingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="text-gray-400">
        DevNotes is free and open source. This page exists to demonstrate the{" "}
        <strong className="text-white">(marketing) route group</strong> — it
        shares a layout with /landing and /about-us, separate from the dashboard
        layout.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { tier: "Free", price: "$0", features: ["5 posts", "Comments", "Basic analytics"] },
          { tier: "Pro", price: "$9", features: ["Unlimited posts", "Comments", "Full analytics"] },
          { tier: "Team", price: "$29", features: ["Everything in Pro", "Team dashboard", "API access"] },
        ].map((plan) => (
          <div
            key={plan.tier}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-4"
          >
            <h3 className="font-semibold text-white">{plan.tier}</h3>
            <p className="text-3xl font-bold text-indigo-400">{plan.price}<span className="text-sm text-gray-500">/mo</span></p>
            <ul className="text-sm text-gray-400 space-y-1">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
