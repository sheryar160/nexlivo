import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {SeoHead} from '../components/SeoHead';

interface LegalLayoutProps {
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  heading: string;
  lastUpdated: string;
  children: ReactNode;
}

function LegalLayout({
  seoTitle,
  seoDescription,
  kicker,
  heading,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} />

      <section className="border-b border-pink-100 bg-gradient-to-b from-pink-50/45 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            {kicker}
          </span>
          <h1
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            {heading}
          </h1>
          <p className="mt-2 text-xs font-medium text-slate-500">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base">
          {children}
        </div>

        <div className="mt-12 border-t border-pink-100 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalLayout
      seoTitle="Privacy Policy | NEXLIVO"
      seoDescription="Read the NEXLIVO Privacy Policy explaining how visitor information, contact inquiries, cookies, and third-party advertising partners are handled."
      kicker="Legal & Privacy"
      heading="Privacy Policy"
      lastUpdated="November 2026"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">1. Overview</h2>
        <p>
          NEXLIVO respects visitor privacy. This Privacy Policy describes what information may be
          collected when you browse our website, submit a contact inquiry, or interact with
          third-party services or future advertising integrations.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">2. Information You Voluntarily Provide</h2>
        <p>
          When you contact NEXLIVO through a configured contact form or email channel, we receive
          the details you choose to submit, such as your full name, email address, subject, and
          message content. We use that information solely to read and respond to your inquiry.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">3. Automatically Collected Technical Data</h2>
        <p>
          Standard web hosting infrastructure (such as Cloudflare Pages edge servers) may log
          routine technical metadata—including IP addresses, browser user-agent strings, referring
          URLs, and requested paths—to maintain network security, prevent abuse, and serve pages
          reliably.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">4. Advertising & Third-Party Partners</h2>
        <p>
          NEXLIVO includes dedicated advertising placements prepared for future integration with
          third-party ad networks such as RevBid. When active, advertising partners may use cookies
          or similar browser technologies to deliver relevant ads, measure performance, and prevent
          invalid traffic according to their own privacy policies.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">5. External Links</h2>
        <p>
          Our articles and resources may reference external websites or industry tools. NEXLIVO is
          not responsible for the privacy practices or content of third-party websites you visit
          after leaving our domain.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">6. Contact Regarding Privacy</h2>
        <p>
          If you have questions about this Privacy Policy or wish to request deletion of a past
          contact message, please reach out via our{' '}
          <Link to="/contact" className="font-semibold text-pink-700 hover:underline">
            Contact Us
          </Link>{' '}
          page.
        </p>
      </div>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      seoTitle="Terms and Conditions | NEXLIVO"
      seoDescription="Review the Terms and Conditions governing access to and use of NEXLIVO business guides and informational resources."
      kicker="Legal & Governance"
      heading="Terms and Conditions"
      lastUpdated="November 2026"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p>
          By accessing or reading content on NEXLIVO, you agree to comply with these Terms and
          Conditions and all applicable laws. If you do not agree with any part of these terms,
          please discontinue using the website.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">2. Informational Purpose Only</h2>
        <p>
          All business guides, industry summaries, checklists, and FAQs published on NEXLIVO are
          provided strictly for general educational and informational purposes. You are solely
          responsible for verifying local laws, tax rules, licensing obligations, and financial
          risks before starting any venture.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property</h2>
        <p>
          Unless otherwise stated, the written articles, layout structure, and NEXLIVO branding
          elements on this site may not be bulk-scraped, republished commercially, or redistributed
          as your own material without prior permission.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">4. Acceptable Use</h2>
        <p>
          Visitors agree not to interfere with website security, attempt automated denial-of-service
          activity, inject malicious scripts, or misuse contact channels for spam or unlawful
          solicitations.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
        <p>
          NEXLIVO makes reasonable efforts to keep informational articles accurate and clear, but
          provides all content &ldquo;as is&rdquo; without warranties of completeness, profitability,
          or uninterrupted availability. NEXLIVO is not liable for business losses, trading
          drawdowns, or commercial decisions made based on website materials.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">6. Updates to Terms</h2>
        <p>
          We may update these Terms and Conditions periodically as the platform expands. Continued
          use of NEXLIVO after updates constitutes acceptance of the revised terms.
        </p>
      </div>
    </LegalLayout>
  );
}

export function DisclaimerPage() {
  return (
    <LegalLayout
      seoTitle="Disclaimer | NEXLIVO"
      seoDescription="Important educational, financial, legal, and advertising disclaimer for NEXLIVO readers."
      kicker="Important Notice"
      heading="Disclaimer"
      lastUpdated="November 2026"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">1. Not Professional Advice</h2>
        <p>
          The articles and guides on NEXLIVO cover business formation, real estate, online trading,
          financial services, international trade, and digital entrepreneurship for educational
          awareness only. Nothing on this website constitutes personalized legal, tax, accounting,
          or regulated investment advice.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">2. No Earnings or Outcome Guarantees</h2>
        <p>
          Every business model carries real financial risk, execution uncertainty, and market
          competition. Any discussion of typical pricing structures, business margins, or entry
          pathways is illustrative and does not guarantee income or commercial success.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">3. Financial & Trading Risk Notice</h2>
        <p>
          Trading equities, currencies, or other financial instruments involves substantial risk of
          capital loss and is not appropriate for everyone. Always evaluate your personal financial
          situation and consult a licensed financial advisor where appropriate.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">4. External References & Advertising</h2>
        <p>
          NEXLIVO may link to external resources and reserve spaces for third-party advertisements
          (such as future RevBid ad units). Presence of an advertisement or external link does not
          constitute an endorsement or guarantee by NEXLIVO.
        </p>
      </div>
    </LegalLayout>
  );
}

export function CookiePolicyPage() {
  return (
    <LegalLayout
      seoTitle="Cookie Policy | NEXLIVO"
      seoDescription="Understand how cookies and browser storage may be used across NEXLIVO for essential navigation and future advertising partners."
      kicker="Transparency"
      heading="Cookie Policy"
      lastUpdated="November 2026"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored in your web browser when you visit websites. They help
          sites remember technical preferences, deliver reliable performance, and support
          analytics or advertising integrations when enabled.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">2. Categories of Cookies</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Essential & Security Cookies:</strong> Used by hosting and CDN providers (such
            as Cloudflare) to protect against automated abuse and ensure fast page routing.
          </li>
          <li>
            <strong>Advertising Cookies (Future RevBid Integration):</strong> When third-party ad
            networks such as RevBid are activated in designated ad slots, those partners may place
            cookies to manage ad frequency, prevent fraudulent clicks, and measure ad delivery.
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">3. Managing Browser Cookies</h2>
        <p>
          You can view, block, or delete cookies at any time through your web browser settings
          (Chrome, Safari, Firefox, Edge). Blocking strictly optional third-party cookies will not
          prevent you from reading any of NEXLIVO&rsquo;s 14 business articles.
        </p>
      </div>
    </LegalLayout>
  );
}
