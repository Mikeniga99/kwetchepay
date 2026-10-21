import { Icon } from './Icon'
import { Logo } from './Logo'
import { OperatorLogo } from './OperatorLogo'

const paymentRows = [
  { initials: 'AK', name: 'Afi Koudjo', ref: '#KP-80492', channel: 'MTN MoMo', op: 'mtn' as const, amount: '48 500 F', state: 'Réussi', kind: 'success' },
  { initials: 'SE', name: 'Serge E.', ref: '#KP-80491', channel: 'Moov Money', op: 'moov' as const, amount: '32 000 F', state: 'Réussi', kind: 'success' },
  { initials: 'DM', name: 'Diane M.', ref: '#KP-80490', channel: 'Celtiis Cash', op: 'celtiis' as const, amount: '74 200 F', state: 'En attente', kind: 'pending' },
]

export function DashboardPreview() {
  return (
    <div className="dashboard-wrap reveal delay-2">
      <div className="dashboard">
        <aside className="dash-sidebar">
          <Logo />
          <div className="dash-menu">
            <span className="dash-menu-active"><Icon name="bars" size={17} /> Vue d’ensemble</span>
            <span><Icon name="card" size={17} /> Transactions</span>
            <span><Icon name="trend" size={17} /> Reversements</span>
            <span><Icon name="code" size={17} /> Développeurs</span>
          </div>
          <div className="dash-user">
            <span className="avatar avatar-dark">GM</span>
            <span><b>GoMarket</b><small>Compte actif</small></span>
          </div>
        </aside>
        <div className="dash-main">
          <div className="dash-top">
            <span><b>Bonjour, Marc</b><small>Voici votre activité aujourd’hui.</small></span>
            <span className="live"><i /> Systèmes opérationnels</span>
          </div>
          <div className="metric-grid">
            <div className="metric featured">
              <small>Volume encaissé</small>
              <strong>8 472 500 <em>F CFA</em></strong>
              <span><Icon name="trend" size={14} /> +12,8% ce mois</span>
              <div className="mini-chart" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i />
              </div>
            </div>
            <div className="metric"><small>Paiements réussis</small><strong>1 284</strong><span className="positive">98,2% de réussite</span></div>
            <div className="metric"><small>À reverser</small><strong>2 144 000 <em>F</em></strong><span>Prochain : 18 juin</span></div>
          </div>
          <div className="transactions">
            <div className="table-title"><span><b>Transactions récentes</b><small>Mises à jour en temps réel</small></span><a href="#marchands">Tout afficher <Icon name="chevron" size={15} /></a></div>
            <div className="table-head"><span>CLIENT</span><span>MOYEN</span><span>MONTANT</span><span>STATUT</span></div>
            {paymentRows.map((row) => (
              <div className="table-row" key={row.ref}>
                <span className="customer"><i className="avatar">{row.initials}</i><i><b>{row.name}</b><small>{row.ref}</small></i></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <OperatorLogo operator={row.op} size={16} />
                  {row.channel}
                </span>
                <b>{row.amount}</b>
                <span className={`status ${row.kind}`}><i />{row.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="float-card float-success">
        <span className="round-icon"><Icon name="check" size={18} /></span>
        <span><small>Paiement confirmé</small><b>125 000 F CFA</b></span>
      </div>
      <div className="float-card float-live">
        <span className="pulse-icon"><i /></span>
        <span><small>API KwêTché Pay</small><b>Opérationnelle</b></span>
      </div>
    </div>
  )
}
