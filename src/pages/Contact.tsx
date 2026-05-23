import { FormEvent, useState } from 'react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { usePortfolio } from '../contexts/PortfolioDataContext';

export default function Contact() {
  const { portfolio, content } = usePortfolio();
  const { profile } = portfolio;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

  function openMailto() {
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      subject ? `Subject: ${subject}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');
    const to = profile?.email ?? 'roshanshresthapnk@gmail.com';
    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject || 'Portfolio contact')}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const phoneDigits = trimmedPhone.replace(/\D/g, '');

    setFlash(null);
    if (trimmedName.split(/\s+/).filter(Boolean).length < 2 || trimmedName.length < 3) {
      setFlash({ type: 'err', text: 'Please enter your full name.' });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
      setFlash({ type: 'err', text: 'Please enter a valid email address.' });
      return;
    }
    if (phoneDigits.length < 7) {
      setFlash({ type: 'err', text: 'Please enter a valid mobile number.' });
      return;
    }

    if (!endpoint) {
      openMailto();
      setFlash({ type: 'ok', text: 'Opening your email client…' });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.set('name', trimmedName);
      fd.set('email', trimmedEmail);
      fd.set('phone', trimmedPhone);
      fd.set('subject', subject);
      fd.set('message', message);
      const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
      if (!res.ok) throw new Error('send');
      setFlash({ type: 'ok', text: 'Message sent successfully.' });
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setFlash({ type: 'err', text: 'Failed to send — try email instead.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <InnerPageLayout>
      <PageHeading title={content.contact.title} subtitle={content.contact.subtitle} />

      <div className="grid gap-10 md:grid-cols-2 items-start mb-8">
        <div>
          <p className="text-slate-600 dark:text-ink-muted mb-4">
            Whether you have a question about a project, want to collaborate, or just want to say hi, my inbox is open.
            I will do my best to get back to you.
          </p>
          <p className="text-sm text-slate-500 dark:text-ink-soft">
            Prefer email? Reach me at{' '}
            <a className="text-accent font-mono hover:underline" href={`mailto:${profile?.email ?? ''}`}>
              {profile?.email}
            </a>
            .
          </p>
          {!endpoint && (
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-3">
              No <code className="text-xs">VITE_CONTACT_FORM_ENDPOINT</code> configured — submit opens your mail client
              with the form contents.
            </p>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-light/60 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {content.contact.formLabels.name}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-ink-light"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {content.contact.formLabels.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-ink-light"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {content.contact.formLabels.phone}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-ink-light"
              placeholder="+61 4XXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {content.contact.formLabels.subject}
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-ink-light"
              placeholder="Project inquiry, collaboration, feedback..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {content.contact.formLabels.message}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-ink-light"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-60"
          >
            {loading ? content.contact.buttons.sending : content.contact.buttons.send}
          </button>
          {flash && (
            <p className={flash.type === 'ok' ? 'text-green-600 dark:text-green-400 text-sm' : 'text-red-600 text-sm'}>
              {flash.text}
            </p>
          )}
        </form>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-6 space-y-3">
        <p>
          {content.contact.links.email}:{' '}
          <a className="text-accent hover:underline" href={`mailto:${profile?.email}`}>
            {profile?.email}
          </a>
        </p>
        {profile?.githubUrl && (
          <p>
            {content.contact.links.github}:{' '}
            <a className="text-accent hover:underline" href={profile.githubUrl} rel="noreferrer">
              {profile.githubUrl}
            </a>
          </p>
        )}
        {profile?.linkedInUrl && (
          <p>
            {content.contact.links.linkedIn}:{' '}
            <a className="text-accent hover:underline" href={profile.linkedInUrl} rel="noreferrer">
              {profile.linkedInUrl}
            </a>
          </p>
        )}
      </div>
    </InnerPageLayout>
  );
}
