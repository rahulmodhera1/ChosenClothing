import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/collections/brown-cargo-set", label: "Brown Cargo Set" },
  { href: "/collections/washed-rhinestone-tracksuit", label: "Rhinestone Tracksuit" },
  { href: "/lookbook", label: "Lookbook" },
];

const infoLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/contact#ambassador", label: "Brand Ambassador" },
];

export default function Footer() {
  return (
    <footer className="bg-[#eef1f5] border-t border-[#dde1e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-3xl text-[#14171c] tracking-widest hover:text-[#8a98ad] transition-colors">CHOSEN</Link>
            <p className="text-[#5b6573] text-sm mt-3 max-w-xs leading-relaxed">Toronto streetwear. Premium but raw. Built for the ones who move different.</p>
            <p className="text-[#8a98ad] text-xs tracking-widest mt-3">#OneInAMillion</p>
            <div className="flex items-center gap-5 mt-5">
              <a href="https://instagram.com/chosenofficialca" target="_blank" rel="noopener noreferrer" aria-label="Chosen on Instagram" className="text-[#5b6573] hover:text-[#14171c] transition-colors p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://x.com/chosen_ca" target="_blank" rel="noopener noreferrer" aria-label="Chosen on X" className="text-[#5b6573] hover:text-[#14171c] transition-colors p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://tiktok.com/@chosen_ca" target="_blank" rel="noopener noreferrer" aria-label="Chosen on TikTok" className="text-[#5b6573] hover:text-[#14171c] transition-colors p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.28 8.28 0 004.84 1.54V7.04a4.85 4.85 0 01-1.07-.35z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[#14171c] text-xs font-medium tracking-widest uppercase mb-4">Shop</h3>
            <ul className="space-y-2.5">{shopLinks.map((link) => (<li key={link.href}><Link href={link.href} className="text-[#5b6573] text-sm hover:text-[#14171c] transition-colors">{link.label}</Link></li>))}</ul>
          </div>
          <div>
            <h3 className="text-[#14171c] text-xs font-medium tracking-widest uppercase mb-4">Info</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (<li key={link.href}><Link href={link.href} className="text-[#5b6573] text-sm hover:text-[#14171c] transition-colors">{link.label}</Link></li>))}
              <li><a href="mailto:chosenbrandca@gmail.com" className="text-[#5b6573] text-sm hover:text-[#14171c] transition-colors">chosenbrandca@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#dde1e8] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#5b6573] text-xs">&copy; 2026 Chosen. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((label) => (<span key={label} className="border border-[#dde1e8] text-[#5b6573] text-[9px] font-bold tracking-wider px-2 py-1 rounded">{label}</span>))}
          </div>
        </div>
      </div>
    </footer>
  );
}
