import React, { useState } from 'react';
import type { Currency } from './CurrencyToggle';
import confetti from 'canvas-confetti';
import { X, Gift, CheckCircle, Copy, Sparkles } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCurrency: Currency;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  defaultCurrency,
}) => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    // Generate random sacred voucher
    const code = `PANTHEON-${currency}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setVoucherCode(code);
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#C8860A', '#FFFFFF', '#008751', '#4CAF50'],
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bonusLabel = currency === 'NGN' ? '₦100 Welcome Offering' : '$1.00 Welcome Offering';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="glass-panel waitlist-modal-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          position: 'relative',
          border: '1px solid rgba(200, 134, 10, 0.6)',
          boxShadow: '0 0 50px rgba(200, 134, 10, 0.35)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(200, 134, 10, 0.2)',
                  border: '1px solid #FFD700',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFD700',
                }}
              >
                <Gift size={30} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginBottom: '8px' }}>
                Claim Your Sacred Offering
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Pre-register now to unlock guaranteed <strong style={{ color: '#FFD700' }}>{bonusLabel}</strong> and early beta access when the world begins spinning.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Currency Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  PREFERRED STARTING CURRENCY
                </label>
                <div className="waitlist-currency-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    className="waitlist-currency-btn"
                    onClick={() => setCurrency('NGN')}
                    style={{
                      background: currency === 'NGN' ? 'rgba(0, 135, 81, 0.3)' : 'rgba(30, 30, 60, 0.4)',
                      border: currency === 'NGN' ? '2px solid #008751' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#FFF',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>🇳🇬</span>
                    <span>₦100 NGN Bonus</span>
                  </button>
                  <button
                    type="button"
                    className="waitlist-currency-btn"
                    onClick={() => setCurrency('USD')}
                    style={{
                      background: currency === 'USD' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(30, 30, 60, 0.4)',
                      border: currency === 'USD' ? '2px solid #4CAF50' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#FFF',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>🇺🇸</span>
                    <span>$1.00 USD Bonus</span>
                  </button>
                </div>
              </div>

              {/* Phone or Email Input */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  PHONE NUMBER OR EMAIL
                </label>
                <input
                  type="text"
                  required
                  placeholder="+234 800 000 0000 or explorer@pantheon.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(10, 10, 26, 0.8)',
                    border: '1px solid rgba(200, 134, 10, 0.4)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    color: '#FFF',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '15px' }}>
                <Sparkles size={18} />
                CONFIRM PRE-REGISTRATION
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(76, 175, 80, 0.2)',
                border: '2px solid #4CAF50',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4CAF50',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFF', marginBottom: '8px' }}>
              Divine Offering Secured!
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your sacred access pass has been reserved. Redeem this voucher code during account creation to claim your {bonusLabel}.
            </p>

            {/* Voucher Box */}
            <div
              className="waitlist-voucher-box"
              style={{
                background: 'rgba(10, 10, 26, 0.9)',
                border: '1px dashed #FFD700',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                gap: '12px',
              }}
            >
              <span className="voucher-code-text" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFD700', letterSpacing: '1px' }}>
                {voucherCode}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#4CAF50' : 'rgba(200, 134, 10, 0.3)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
              Return to Pantheon
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
