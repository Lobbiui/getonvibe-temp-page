export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-8">
        <div className="grid gap-6 text-sm text-slate-300 md:grid-cols-2">
          <div>
            <p className="text-lg font-black text-white">ONVIBE Festival</p>
            <p className="mt-2">GetOnVibe</p>
            <p>Nashville, TN</p>
            <p>October 10</p>
            <p>Venue and time TBA</p>
            <p>21 plus event. Valid ID required.</p>
          </div>
          <div className="md:text-right">
            <p>
              All onsite brand partners and product exhibitors must operate within the legal hemp space and carry active, verifiable Certificates of Analysis for applicable products.
            </p>
            <p className="mt-4">
              Copyright {new Date().getFullYear()} GetOnVibe. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
