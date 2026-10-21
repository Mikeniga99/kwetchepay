import { OperatorLogo } from '@/components/OperatorLogo'

interface TickerItem {
  id: string
  operator: 'mtn' | 'moov' | 'celtiis'
  amount: string
  customer: string
  phone: string
  merchant: string
  city: string
  time: string
}

const TRACK_1: TickerItem[] = [
  { id: 't1', operator: 'mtn', amount: '+ 48 500 F', customer: 'Afi K.', phone: '+229 01 97 12 34 56', merchant: 'GoMarket', city: 'Cotonou', time: 'À l’instant' },
  { id: 't2', operator: 'moov', amount: '+ 12 000 F', customer: 'Benoît A.', phone: '+229 01 95 88 12 34', merchant: 'Pharmacie de l’Étoile', city: 'Porto-Novo', time: 'Il y a 3s' },
  { id: 't3', operator: 'celtiis', amount: '+ 74 200 F', customer: 'Diane M.', phone: '+229 01 40 55 67 89', merchant: 'Hôtel Les Cocotiers', city: 'Ouidah', time: 'Il y a 5s' },
  { id: 't4', operator: 'mtn', amount: '+ 125 000 F', customer: 'Serge E.', phone: '+229 01 96 33 22 11', merchant: 'Auto Pièces Bénin', city: 'Parakou', time: 'Il y a 7s' },
  { id: 't5', operator: 'moov', amount: '+ 6 500 F', customer: 'Chantal H.', phone: '+229 01 94 11 22 33', merchant: 'Superette Calavi', city: 'Abomey-Calavi', time: 'Il y a 9s' },
]

const TRACK_2: TickerItem[] = [
  { id: 't6', operator: 'celtiis', amount: '+ 35 000 F', customer: 'Gaston K.', phone: '+229 01 42 12 34 56', merchant: 'Librairie Moderne', city: 'Cotonou', time: 'Il y a 1s' },
  { id: 't7', operator: 'mtn', amount: '+ 18 000 F', customer: 'Fatou D.', phone: '+229 01 97 09 87 65', merchant: 'Boutique Wax & Co', city: 'Bohicon', time: 'Il y a 4s' },
  { id: 't8', operator: 'moov', amount: '+ 95 000 F', customer: 'Marc D.', phone: '+229 01 95 00 22 33', merchant: 'Cabinet Conseil RH', city: 'Cotonou', time: 'Il y a 6s' },
  { id: 't9', operator: 'celtiis', amount: '+ 14 500 F', customer: 'Aimée S.', phone: '+229 01 40 00 33 44', merchant: 'Pressing Élite', city: 'Porto-Novo', time: 'Il y a 8s' },
  { id: 't10', operator: 'mtn', amount: '+ 50 000 F', customer: 'Roland T.', phone: '+229 01 97 44 55 66', merchant: 'Agence Digitale 229', city: 'Abomey-Calavi', time: 'Il y a 10s' },
]

export function KineticLiveTicker() {
  return (
    <div style={{ overflow: 'hidden', padding: '30px 0', position: 'relative' }}>
      {/* Top Banner title */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }} />
          FLUX DES ENCAISSEMENTS AU BÉNIN EN DIRECT
        </div>
      </div>

      {/* Marquee Track 1 (sliding left) */}
      <div style={{ overflow: 'hidden', marginBottom: '14px', width: '100%' }}>
        <div className="marquee-track marquee-left">
          {[...TRACK_1, ...TRACK_1].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="ticker-card">
              <OperatorLogo operator={item.operator} size={20} />
              <div>
                <b style={{ color: 'var(--green)', fontSize: '13px' }}>{item.amount}</b>
                <span style={{ color: 'var(--muted)', fontSize: '11px', marginLeft: '6px' }}>• {item.merchant} ({item.city})</span>
              </div>
              <span style={{ fontSize: '10px', background: '#eef3f1', padding: '2px 6px', borderRadius: '4px', color: 'var(--muted)', fontFamily: 'var(--font-dm-mono)' }}>
                {item.phone}
              </span>
              <span style={{ fontSize: '10px', color: '#16856f', fontWeight: 700 }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (sliding right) */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="marquee-track marquee-right">
          {[...TRACK_2, ...TRACK_2].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="ticker-card">
              <OperatorLogo operator={item.operator} size={20} />
              <div>
                <b style={{ color: 'var(--green)', fontSize: '13px' }}>{item.amount}</b>
                <span style={{ color: 'var(--muted)', fontSize: '11px', marginLeft: '6px' }}>• {item.merchant} ({item.city})</span>
              </div>
              <span style={{ fontSize: '10px', background: '#eef3f1', padding: '2px 6px', borderRadius: '4px', color: 'var(--muted)', fontFamily: 'var(--font-dm-mono)' }}>
                {item.phone}
              </span>
              <span style={{ fontSize: '10px', color: '#16856f', fontWeight: 700 }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
