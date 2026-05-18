'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const t = useTranslations('login');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${window.location.pathname.replace(/\/login$/, '/auth/callback')}`,
      },
    });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('sent');
    }
  }

  async function signInWithGoogle() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${window.location.pathname.replace(/\/login$/, '/auth/callback')}`,
      },
    });
  }

  return (
    <form onSubmit={sendMagicLink} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">{t('emailLabel')}</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={cn(
          'w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90',
          status === 'sending' && 'opacity-50',
        )}
      >
        {t('submitMagicLink')}
      </button>

      {status === 'sent' && (
        <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          {t('magicLinkSent')}
        </p>
      )}
      {status === 'error' && errorMsg && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {errorMsg}
        </p>
      )}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t('or')}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        {t('googleSignIn')}
      </button>
    </form>
  );
}
