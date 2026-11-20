import {FormEvent, useState} from 'react';
import {AlertCircle, CheckCircle2, Mail, Send} from 'lucide-react';
import {SeoHead} from '../components/SeoHead';

const CONTACT_ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || '';
const CONTACT_EMAIL =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || 'contact@nexlivo.example';

type SubmitState =
  | {status: 'idle'}
  | {status: 'submitting'}
  | {status: 'success'; message: string}
  | {status: 'unconfigured'; mailtoHref: string}
  | {status: 'error'; message: string};

export function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({status: 'idle'});

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setSubmitState({
        status: 'error',
        message: 'Please complete all four required fields before submitting.',
      });
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setSubmitState({
        status: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (!CONTACT_ENDPOINT) {
      const bodyLines = [
        `Name: ${trimmedName}`,
        `Reply-To: ${trimmedEmail}`,
        '',
        trimmedMessage,
      ].join('\n');
      const mailtoHref = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(
        `[NEXLIVO Inquiry] ${trimmedSubject}`,
      )}&body=${encodeURIComponent(bodyLines)}`;

      setSubmitState({
        status: 'unconfigured',
        mailtoHref,
      });
      return;
    }

    setSubmitState({status: 'submitting'});
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitState({
        status: 'success',
        message: 'Your inquiry has been delivered to our team.',
      });
    } catch {
      setSubmitState({
        status: 'error',
        message:
          'We could not deliver your message through the configured endpoint. Please try again later or reach us via email.',
      });
    }
  };

  return (
    <>
      <SeoHead
        title="Contact Us | NEXLIVO"
        description="Get in touch with the NEXLIVO team for editorial feedback, topic suggestions, or general business information inquiries."
      />

      <section className="border-b border-pink-100 bg-gradient-to-b from-pink-50/50 to-white py-14 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            Contact NEXLIVO
          </span>
          <h1
            className="mt-3 font-bold tracking-tight text-slate-900"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 4vw, 3.25rem)',
              lineHeight: 1.12,
            }}
          >
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Have editorial feedback, a correction request, or a question about one of our business
            guides? Use the contact section below to reach our team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Clearly Visible Contact Information Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-pink-100 bg-pink-50/35 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-700 text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Direct Contact</h2>
                  <p className="text-xs text-slate-500">Editorial & General Inquiries</p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-900">Email Channel</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-medium text-pink-700 hover:underline break-all"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Topics We Welcome</dt>
                  <dd className="mt-1 leading-relaxed text-slate-600">
                    Topic requests for future industry briefings, editorial clarifications, and
                    advertising inquiries.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Advisory Boundary</dt>
                  <dd className="mt-1 leading-relaxed text-slate-600">
                    NEXLIVO cannot provide personalized investment, legal, or tax advice via email
                    or contact inquiries.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-slate-200/85 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900">Send a Message</h2>
              <p className="mt-1 text-sm text-slate-600">
                All fields below are required so we can respond accurately.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="contact-full-name"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                {submitState.status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                    <span>{submitState.message}</span>
                  </div>
                )}

                {submitState.status === 'success' && (
                  <div
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{submitState.message}</span>
                  </div>
                )}

                {submitState.status === 'unconfigured' && (
                  <div
                    role="status"
                    className="space-y-3 rounded-xl border border-pink-200 bg-pink-50/60 p-4 text-sm text-slate-700"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-pink-700" />
                      <p>
                        Automated web form submission is not yet connected to a backend mail relay
                        on this static deployment (configure{' '}
                        <code className="rounded bg-white px-1.5 py-0.5 text-xs font-mono text-slate-800">
                          VITE_CONTACT_ENDPOINT
                        </code>{' '}
                        to enable direct POST delivery). Your message has not been sent yet—you can
                        open it directly in your email application below:
                      </p>
                    </div>
                    <a
                      href={submitState.mailtoHref}
                      className="inline-flex items-center gap-2 rounded-lg bg-pink-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-pink-800"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Open Draft in Email App</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitState.status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-800 disabled:opacity-60 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {submitState.status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
