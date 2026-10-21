'use client'

import { Icon } from '@/components/Icon'
import { OperatorLogo } from '@/components/OperatorLogo'
import { useEffect, useState } from 'react'

export function KineticHeroReel() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [balance, setBalance] = useState(2144000)

  // Step duration in seconds
  const STEP_DURATION = 3500

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev >= 4 ? 1 : prev + 1
        return next
      })
    }, STEP_DURATION)

    return () => clearInterval(timer)
  }, [isPlaying])

  // Update balance on step 4
  useEffect(() => {
    if (currentStep === 4) {
      setBalance(2169000)
    } else if (currentStep === 1) {
      setBalance(2144000)
    }
  }, [currentStep])

  const stepsInfo = [
    { num: 1, label: '1. Panier client', sub: 'Sélection sur le site marchand' },
    { num: 2, label: '2. Push USSD MoMo', sub: 'Notification directe sur mobile' },
    { num: 3, label: '3. Passerelle KwêTché', sub: 'Routage & cryptage sécurisé' },
    { num: 4, label: '4. Encaissement immédiat', sub: 'Fonds crédités au marchand' },
  ]

  return (
    <div className="kinetic-frame" style={{ margin: '40px 0', padding: '24px 20px' }}>
      {/* Top Player Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#5fe0a8',
              boxShadow: '0 0 10px #5fe0a8',
              display: 'inline-block',
            }}
          />
          <b style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5fe0a8' }}>
            DÉMONSTRATION DU FLUX EN TEMPS RÉEL (60 FPS)
          </b>
        </div>

        {/* Play / Pause & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isPlaying ? '❚❚ Pause' : '▶ Lecture'}
          </button>
        </div>
      </div>

      {/* Step Progress Track */}
      <div className="kinetic-step-track">
        {stepsInfo.map((s) => {
          const isActive = currentStep === s.num
          const isPassed = currentStep > s.num
          return (
            <button
              key={s.num}
              onClick={() => {
                setCurrentStep(s.num)
                setIsPlaying(false)
              }}
              style={{
                background: isActive
                  ? 'rgba(244, 93, 34, 0.2)'
                  : isPassed
                  ? 'rgba(22, 133, 111, 0.15)'
                  : 'rgba(255,255,255,0.04)',
                border: isActive
                  ? '1px solid var(--orange)'
                  : isPassed
                  ? '1px solid var(--green)'
                  : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
                textAlign: 'left',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: isActive ? 'var(--orange)' : isPassed ? '#5fe0a8' : '#8fa29e' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '10px', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.sub}
              </div>
            </button>
          )
        })}
      </div>

      {/* Visual Arena: interactive simulation */}
      <div className="kinetic-arena">
        {/* SIDE 1: Customer Phone Mockup */}
        <div
          style={{
            background: '#ffffff',
            color: 'var(--ink)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '2px solid rgba(255,255,255,0.2)',
            animation: 'phone-bob 5s ease-in-out infinite',
            position: 'relative',
          }}
        >
          {/* Phone Top Notch */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '9px', color: 'var(--muted)', fontWeight: 700 }}>
            <span>09:41</span>
            <div style={{ width: '40px', height: '4px', background: '#e0e5e3', borderRadius: '99px' }} />
            <span>4G • MTN BJ</span>
          </div>

          {/* Screen Content based on Current Step */}
          {currentStep === 1 && (
            <div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>Boutique en ligne</div>
              <b style={{ fontSize: '14px', display: 'block', margin: '3px 0 10px' }}>Pack Matériel Informatique</b>
              <div style={{ background: '#f5f7f6', padding: '10px', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span>Total commande :</span>
                  <b style={{ color: 'var(--orange-dark)' }}>25 000 F CFA</b>
                </div>
              </div>
              <div style={{ background: 'var(--orange)', color: 'white', padding: '8px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', fontWeight: 700 }}>
                ✓ Payer avec KwêTché Pay
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', padding: '10px', marginBottom: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#856404', marginBottom: '4px' }}>
                  PROMPT USSD DIRECT
                </div>
                <p style={{ fontSize: '10px', color: '#665113', margin: 0 }}>
                  Transfert de <b>25 000 F</b> vers <b>GoMarket Bénin</b> ?
                </p>
              </div>
              <div style={{ fontSize: '11px', textAlign: 'center', color: 'var(--muted)', marginBottom: '8px' }}>
                Saisie du code secret Mobile Money :
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'var(--ink)',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>
              <div style={{ background: 'var(--green)', color: 'white', padding: '6px', borderRadius: '6px', textAlign: 'center', fontSize: '10px', fontWeight: 700 }}>
                Validation automatique...
              </div>
            </div>
          )}

          {currentStep >= 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--green-soft)',
                  color: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 10px',
                }}
              >
                <Icon name="check" size={24} />
              </div>
              <b style={{ fontSize: '13px', color: 'var(--green)', display: 'block' }}>Paiement Autorisé</b>
              <small style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>
                Débit effectué sur le compte (+229 01 97 12 34 56)
              </small>
            </div>
          )}
        </div>

        {/* CENTER: Laser Data Beam & KwêTché Gateway Hub */}
        <div
          className="kinetic-hub"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            textAlign: 'center',
            position: 'relative',
            padding: '0 10px',
          }}
        >
          {/* Floating animated beam line */}
          <div
            className="kinetic-hub-beam"
            style={{
              width: '100px',
              height: '3px',
              background: 'linear-gradient(90deg, #f45d22, #5fe0a8)',
              borderRadius: '99px',
              boxShadow: currentStep >= 2 ? '0 0 16px #5fe0a8' : 'none',
              transition: 'all 0.5s ease',
            }}
          />

          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: currentStep >= 3 ? 'var(--orange)' : 'rgba(255,255,255,0.08)',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: currentStep >= 3 ? '0 0 25px rgba(244,93,34,0.7)' : 'none',
              transition: 'all 0.4s ease',
            }}
          >
            <span className="logo-symbol" style={{ width: '22px', height: '22px' }}>
              <span style={{ width: '12px', height: '20px', borderColor: 'white' }} />
              <span style={{ width: '12px', height: '20px', borderColor: 'white' }} />
            </span>
          </div>

          <div style={{ fontSize: '10px', color: '#9db4b0', fontWeight: 700, letterSpacing: '0.8px' }}>
            {currentStep === 1 && 'Prêt à router'}
            {currentStep === 2 && 'Appel API Télécom...'}
            {currentStep === 3 && '🔒 Cryptage SSL 256-bit'}
            {currentStep === 4 && '✓ Webhook Dispatché'}
          </div>
        </div>

        {/* SIDE 2: Merchant Dashboard Ingestion */}
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '18px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.4s ease',
            boxShadow: currentStep === 4 ? '0 0 35px rgba(22, 133, 111, 0.35)' : 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', color: '#9db4b0', fontWeight: 600 }}>CONSOLE MARCHAND</span>
            <span
              style={{
                fontSize: '10px',
                background: currentStep === 4 ? '#16856f' : 'rgba(255,255,255,0.1)',
                padding: '3px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 700,
              }}
            >
              {currentStep === 4 ? '● DIRECT +25 000 F' : 'EN ATTENTE'}
            </span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <small style={{ color: '#9db4b0', fontSize: '10px', display: 'block' }}>Solde disponible crédité :</small>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: currentStep === 4 ? '#5fe0a8' : 'white',
                transition: 'color 0.4s ease',
                fontFamily: 'var(--font-dm-mono)',
              }}
            >
              {balance.toLocaleString('fr-FR')} <em style={{ fontSize: '11px', fontStyle: 'normal', opacity: 0.7 }}>F CFA</em>
            </div>
          </div>

          {/* New Transaction Item that animates in */}
          <div
            style={{
              background: currentStep === 4 ? 'rgba(22, 133, 111, 0.25)' : 'rgba(255,255,255,0.03)',
              border: currentStep === 4 ? '1px solid #2b6d60' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.4s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <OperatorLogo operator="mtn" size={18} />
              <div>
                <b style={{ display: 'block', color: 'white' }}>+ 25 000 F CFA</b>
                <span style={{ color: '#9db4b0', fontSize: '9px' }}>Afi K. (+229 01 97 12 34 56)</span>
              </div>
            </div>

            <span
              style={{
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '9px',
                fontWeight: 700,
                background: currentStep === 4 ? '#16856f' : 'rgba(255,255,255,0.08)',
                color: 'white',
              }}
            >
              {currentStep === 4 ? 'Confirmé' : 'En attente'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
