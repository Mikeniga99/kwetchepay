'use client'

import { Icon } from '@/components/Icon'
import { OperatorLogo, type OperatorType } from '@/components/OperatorLogo'
import { useEffect, useState } from 'react'
import { ButtonSpinner } from './ui/ButtonSpinner'

interface MobileMoneyPushModalProps {
  isOpen: boolean
  onClose: () => void
  initialAmount?: number
}

type PushState = 'form' | 'initiating' | 'push_waiting' | 'success' | 'failed'

export function MobileMoneyPushModal({
  isOpen,
  onClose,
  initialAmount = 15000,
}: MobileMoneyPushModalProps) {
  const [operator, setOperator] = useState<OperatorType>('mtn')
  const [phone, setPhone] = useState('0197001122')
  const [amount, setAmount] = useState(initialAmount.toString())
  const [state, setState] = useState<PushState>('form')
  const [countdown, setCountdown] = useState(45)

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setState('form')
      setCountdown(45)
    }
  }, [isOpen])

  // Countdown timer during push_waiting
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (state === 'push_waiting' && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    } else if (state === 'push_waiting' && countdown === 0) {
      setState('failed')
    }
    return () => clearTimeout(timer)
  }, [state, countdown])

  if (!isOpen) return null

  const handleStartPush = (e: React.FormEvent) => {
    if (phone.length !== 10 || !phone.startsWith('01')) {
      alert('Veuillez saisir un numéro béninois valide à 10 chiffres commençant par 01.')
      return
    }
    setState('initiating')
    setTimeout(() => {
      setCountdown(45)
      setState('push_waiting')
    }, 1200)
  }

  const simulateCustomerConfirm = () => {
    setState('success')
  }

  const operatorNames: Record<OperatorType, string> = {
    mtn: 'MTN Mobile Money Bénin',
    moov: 'Moov Money Bénin',
    celtiis: 'Celtiis Cash Bénin',
    xof: 'Franc CFA',
  }

  return (
    <div className="dash-modal-backdrop" onClick={onClose}>
      <div
        className="dash-modal-card"
        style={{ maxWidth: '460px', padding: '30px 26px', textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '1px' }}>
              SIMULATEUR DE PASSERELLE
            </span>
          </div>
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
            onClick={onClose}
            aria-label="Fermer"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* STATE 1: FORM */}
        {state === 'form' && (
          <form onSubmit={handleStartPush} style={{ textAlign: 'left' }}>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px' }}>Paiement Mobile Money</h2>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                Simulez l’expérience de paiement push USSD en direct.
              </p>
            </div>

            {/* Operator selector */}
            <div className="form-group">
              <label>Sélectionnez l’opérateur télécom</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {(['mtn', 'moov', 'celtiis'] as OperatorType[]).map((op) => {
                  const selected = operator === op
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setOperator(op)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: '8px',
                        border: selected ? '2px solid var(--orange)' : '1px solid var(--line)',
                        background: selected ? 'var(--orange-soft)' : '#fafbfa',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <OperatorLogo operator={op} size={28} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: selected ? 'var(--orange-dark)' : 'var(--ink)' }}>
                        {op === 'mtn' ? 'MTN MoMo' : op === 'moov' ? 'Moov Money' : 'Celtiis Cash'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sim-amount">Montant à encaisser (F CFA)</label>
              <input
                id="sim-amount"
                className="form-control"
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sim-phone">Numéro de téléphone client (Bénin — 10 chiffres)</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ padding: '0 12px', background: '#f0f3f2', borderRadius: '8px', height: '44px', display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  +229
                </span>
                <input
                  id="sim-phone"
                  className="form-control"
                  style={{ flex: 1, fontFamily: 'var(--font-dm-mono)' }}
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="01 97 XX XX XX"
                  value={phone}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '')
                    setPhone(clean)
                  }}
                />
              </div>
              <small style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                Format obligatoire à 10 chiffres débutant par <strong>01</strong> (+229 01 XX XX XX XX)
              </small>
            </div>

            <button
              type="submit"
              className="button button-primary"
              style={{ width: '100%', minHeight: '46px', marginTop: '14px', fontSize: '13px' }}
            >
              Envoyer la notification Push USSD →
            </button>
          </form>
        )}

        {/* STATE 2: INITIATING */}
        {state === 'initiating' && (
          <div style={{ padding: '40px 0' }}>
            <div className="brand-loader-logo" style={{ marginBottom: '20px' }}>
              <OperatorLogo operator={operator} size={48} />
            </div>
            <h3 style={{ fontSize: '17px', margin: '0 0 8px' }}>Connexion à {operatorNames[operator]}...</h3>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
              Génération du prompt de paiement sécurisé KwêTché Pay
            </p>
            <div style={{ marginTop: '24px' }}>
              <ButtonSpinner label="Initialisation..." color="var(--orange)" />
            </div>
          </div>
        )}

        {/* STATE 3: PUSH WAITING (RADAR ANIMATION) */}
        {state === 'push_waiting' && (
          <div style={{ padding: '20px 0 10px' }}>
            {/* Radar concentric rings */}
            <div className="radar-hub">
              <div className="radar-ring" />
              <div className="radar-ring" />
              <div className="radar-center">
                <OperatorLogo operator={operator} size={34} />
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '26px', marginBottom: '8px' }}>
              Validation sur le téléphone du client
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', maxWidth: '340px', margin: '0 auto 16px' }}>
              Un prompt sécurisé USSD a été transmis au <strong style={{ color: 'var(--ink)' }}>+229 {phone.startsWith('01') ? phone : '01 ' + phone}</strong> pour un montant de <strong style={{ color: 'var(--ink)' }}>{parseInt(amount || '0').toLocaleString('fr-FR')} F CFA</strong>.
            </p>

            {/* Countdown pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff8f0',
                border: '1px solid #fed7aa',
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--orange-dark)',
                marginBottom: '28px',
              }}
            >
              <span className="btn-spinner" style={{ borderTopColor: 'var(--orange)' }} />
              Délai restant : {countdown}s
            </div>

            {/* Simulator action to trigger success */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="button button-primary"
                style={{ width: '100%', minHeight: '44px', background: 'var(--green)', borderColor: 'var(--green)' }}
                onClick={simulateCustomerConfirm}
              >
                ✓ Simuler la saisie du PIN par le client
              </button>
              <button
                type="button"
                className="button button-secondary"
                style={{ width: '100%', minHeight: '38px', fontSize: '12px' }}
                onClick={() => setState('form')}
              >
                Annuler l’opération
              </button>
            </div>
          </div>
        )}

        {/* STATE 4: SUCCESS */}
        {state === 'success' && (
          <div style={{ padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--green-soft)',
                color: 'var(--green)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 18px',
              }}
            >
              <Icon name="check" size={34} />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px' }}>Paiement Confirmé !</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 20px' }}>
              Les fonds sont instantanément crédités sur votre compte marchand.
            </p>

            <div
              style={{
                background: '#f8faf9',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '13px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Montant encaissé :</span>
                <b>{parseInt(amount || '0').toLocaleString('fr-FR')} F CFA</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>Opérateur :</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <OperatorLogo operator={operator} size={18} />
                  <span>{operatorNames[operator]}</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Client :</span>
                <b>+229 {phone.startsWith('01') ? phone : '01 ' + phone}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Statut :</span>
                <span className="status success"><i></i> Succès</span>
              </div>
            </div>

            <button
              type="button"
              className="button button-primary"
              style={{ width: '100%', minHeight: '44px' }}
              onClick={onClose}
            >
              Fermer le simulateur
            </button>
          </div>
        )}

        {/* STATE 5: FAILED / TIMEOUT */}
        {state === 'failed' && (
          <div style={{ padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#fde8e8',
                color: '#c81e1e',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 18px',
              }}
            >
              <Icon name="x" size={32} />
            </div>

            <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 6px' }}>Délai Expiré</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 20px' }}>
              Le client n’a pas validé la notification USSD dans le temps imparti.
            </p>

            <button
              type="button"
              className="button button-primary"
              style={{ width: '100%', minHeight: '44px' }}
              onClick={() => setState('form')}
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
