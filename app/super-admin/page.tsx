'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Icon, type IconName } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { OperatorLogo } from '@/components/OperatorLogo'

type Section = 'overview' | 'merchants' | 'transactions' | 'operators' | 'users' | 'audit'

const navigation: { id: Section; label: string; icon: IconName }[] = [
  { id: 'overview', label: "Vue d'ensemble", icon: 'bars' },
  { id: 'merchants', label: 'Marchands', icon: 'users' },
  { id: 'transactions', label: 'Transactions', icon: 'card' },
  { id: 'operators', label: 'Opérateurs', icon: 'globe' },
  { id: 'users', label: 'Utilisateurs', icon: 'lock' },
  { id: 'audit', label: "Journal d'audit", icon: 'shield' },
]

const merchants = [
  { name: 'GoMarket Bénin', id: 'kw_mch_80492', sector: 'Commerce', volume: '18 420 500 F', status: 'Actif' },
  { name: 'Chez Afi', id: 'kw_mch_80487', sector: 'Restauration', volume: '6 240 000 F', status: 'À vérifier' },
  { name: 'Bénin Express', id: 'kw_mch_80461', sector: 'Transport', volume: '12 880 000 F', status: 'Actif' },
  { name: 'Pharmacie du Port', id: 'kw_mch_80394', sector: 'Santé', volume: '3 170 500 F', status: 'En revue' },
  { name: 'Maison Kora', id: 'kw_mch_80328', sector: 'Mode', volume: '2 904 000 F', status: 'Actif' },
]

const transactions = [
  { ref: 'KP-1048291', merchant: 'GoMarket Bénin', operator: 'MTN MoMo', amount: '48 500 F', time: '10:42', status: 'Réussie' },
  { ref: 'KP-1048290', merchant: 'Bénin Express', operator: 'Moov Money', amount: '32 000 F', time: '10:39', status: 'Réussie' },
  { ref: 'KP-1048289', merchant: 'Chez Afi', operator: 'Celtiis Cash', amount: '74 200 F', time: '10:34', status: 'En attente' },
  { ref: 'KP-1048288', merchant: 'Maison Kora', operator: 'MTN MoMo', amount: '16 000 F', time: '10:30', status: 'Échouée' },
  { ref: 'KP-1048287', merchant: 'Pharmacie du Port', operator: 'Moov Money', amount: '9 750 F', time: '10:25', status: 'Réussie' },
]

const admins = [
  { name: 'Marc Dossou', email: 'marc.d@kwetchepay.bj', role: 'Super administrateur', last: 'À l’instant', status: 'Actif' },
  { name: 'Nadia Hounkpe', email: 'nadia.h@kwetchepay.bj', role: 'Conformité', last: 'Il y a 18 min', status: 'Actif' },
  { name: 'David Kiki', email: 'david.k@kwetchepay.bj', role: 'Opérations', last: 'Il y a 2 h', status: 'Actif' },
  { name: 'Alice Soglo', email: 'alice.s@kwetchepay.bj', role: 'Support', last: 'Hier à 16:20', status: 'Suspendu' },
]

const auditEvents = [
  { actor: 'Nadia Hounkpe', action: 'Dossier marchand consulté', target: 'Chez Afi · kw_mch_80487', time: '10:41:18', kind: 'Lecture' },
  { actor: 'David Kiki', action: 'Rapport opérateur exporté', target: 'MTN MoMo · 21 oct. 2026', time: '10:18:52', kind: 'Export' },
  { actor: 'Marc Dossou', action: 'Connexion administrateur', target: 'Nouvel appareil reconnu', time: '09:56:04', kind: 'Sécurité' },
  { actor: 'Nadia Hounkpe', action: 'Vérification KYC consultée', target: 'Pharmacie du Port', time: '09:32:41', kind: 'Lecture' },
  { actor: 'David Kiki', action: 'Détail de transaction consulté', target: 'KP-1048289', time: '09:04:27', kind: 'Lecture' },
]

const operators = [
  { name: 'MTN MoMo', key: 'mtn' as const, uptime: '99,98 %', success: '98,7 %', latency: '1,2 s', status: 'Opérationnel' },
  { name: 'Moov Money', key: 'moov' as const, uptime: '99,92 %', success: '97,9 %', latency: '1,8 s', status: 'Opérationnel' },
  { name: 'Celtiis Cash', key: 'celtiis' as const, uptime: '99,74 %', success: '96,4 %', latency: '2,4 s', status: 'À surveiller' },
]

function StatusPill({ children }: { children: string }) {
  const style = children === 'Réussie' || children === 'Actif' || children === 'Opérationnel'
    ? 'success'
    : children === 'Échouée' || children === 'Suspendu'
      ? 'danger'
      : 'warning'
  return <span className={`sa-status sa-status-${style}`}><i />{children}</span>
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="sa-table-scroll">
      <table className="sa-table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td className="sa-empty" colSpan={headers.length}>Aucun résultat.</td></tr>}</tbody>
      </table>
    </div>
  )
}

export default function SuperAdminPage() {
  const [section, setSection] = useState<Section>('overview')
  const [query, setQuery] = useState('')
  const activeLabel = navigation.find((item) => item.id === section)?.label ?? "Vue d'ensemble"
  const normalizedQuery = query.trim().toLocaleLowerCase('fr')
  const matches = (values: (string | undefined)[]) => !normalizedQuery || values.some((value) => value?.toLocaleLowerCase('fr').includes(normalizedQuery))

  const merchantRows = useMemo(() => merchants.filter((merchant) => matches(Object.values(merchant))), [normalizedQuery])
  const transactionRows = useMemo(() => transactions.filter((transaction) => matches(Object.values(transaction))), [normalizedQuery])
  const adminRows = useMemo(() => admins.filter((admin) => matches(Object.values(admin))), [normalizedQuery])
  const auditRows = useMemo(() => auditEvents.filter((event) => matches(Object.values(event))), [normalizedQuery])

  const title = section === 'overview' ? "Vue d'ensemble" : activeLabel

  return (
    <main className="super-admin">
      <aside className="sa-sidebar">
        <div className="sa-brand"><Logo light size="sm" /><span className="sa-brand-tag">ADMIN</span></div>
        <div className="sa-workspace"><span className="sa-workspace-icon">K</span><span><b>KwêTché Pay</b><small>Console plateforme</small></span><Icon name="chevron" size={15} /></div>
        <p className="sa-nav-label">SUPERVISION</p>
        <nav className="sa-nav" aria-label="Navigation Super Admin">
          {navigation.map((item) => (
            <button key={item.id} title={item.label} aria-pressed={section === item.id} className={`sa-nav-item ${section === item.id ? 'active' : ''}`} onClick={() => { setSection(item.id); setQuery('') }}>
              <Icon name={item.icon} size={17} /><span>{item.label}</span>
              {item.id === 'merchants' && <i className="sa-nav-count">3</i>}
            </button>
          ))}
        </nav>
        <div className="sa-sidebar-bottom">
          <div className="sa-security-note"><Icon name="lock" size={16} /><span><b>Mode lecture seule</b><small>Console de démonstration</small></span></div>
          <div className="sa-admin-profile"><span className="sa-admin-avatar">MD</span><span><b>Marc Dossou</b><small>Super administrateur</small></span><Icon name="chevron" size={14} /></div>
        </div>
      </aside>

      <section className="sa-main">
        <header className="sa-topbar">
          <div className="sa-breadcrumb"><span>Plateforme</span><Icon name="chevron" size={14} /><b>{title}</b></div>
          <div className="sa-topbar-actions"><span className="sa-env sa-env-demo"><i /> Mode démo</span><button className="sa-icon-button" aria-label="Notifications"><Icon name="clock" size={18} /><i /></button><span className="sa-topbar-user">MD</span></div>
        </header>

        <div className="sa-content">
          <div className="sa-title-row">
            <div><p className="sa-eyebrow">KWÊTCHÉ PAY · SUPERVISION</p><h1>{title}</h1><p className="sa-subtitle">Surveillez l’activité et l’état général de la plateforme.</p></div>
            {section !== 'overview' && <label className="sa-search"><Icon name="bars" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Rechercher ${title.toLocaleLowerCase('fr')}…`} /></label>}
          </div>

          {section === 'overview' && <>
            <div className="sa-metrics">
              <article className="sa-metric"><span className="sa-metric-icon sa-icon-blue"><Icon name="trend" size={18} /></span><small>Volume traité aujourd’hui</small><strong>28 640 500 <em>FCFA</em></strong><span className="sa-metric-change">↗ 12,8 % <i>vs. hier</i></span></article>
              <article className="sa-metric"><span className="sa-metric-icon sa-icon-green"><Icon name="card" size={18} /></span><small>Transactions aujourd’hui</small><strong>8 492</strong><span className="sa-metric-change">↗ 8,4 % <i>vs. hier</i></span></article>
              <article className="sa-metric"><span className="sa-metric-icon sa-icon-orange"><Icon name="users" size={18} /></span><small>Marchands actifs</small><strong>1 284</strong><span className="sa-metric-foot">+ 18 ce mois-ci</span></article>
              <article className="sa-metric"><span className="sa-metric-icon sa-icon-purple"><Icon name="check" size={18} /></span><small>Taux de réussite</small><strong>98,2 <em>%</em></strong><span className="sa-metric-foot">Sur les dernières 24 h</span></article>
            </div>

            <div className="sa-overview-grid">
              <article className="sa-panel sa-volume-panel">
                <div className="sa-panel-heading"><div><h2>Volume des transactions</h2><p>Activité agrégée · 7 derniers jours</p></div><span className="sa-panel-total">186,4 M <small>FCFA</small></span></div>
                <div className="sa-chart" aria-label="Graphique du volume des transactions sur sept jours">
                  {[38, 55, 43, 76, 62, 89, 69, 50, 78, 58, 95, 72, 61, 83, 100, 68, 77, 91, 59, 86, 72, 98, 66, 80, 93, 70, 84, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                </div>
                <div className="sa-chart-labels"><span>Mer. 15</span><span>Jeu. 16</span><span>Ven. 17</span><span>Sam. 18</span><span>Dim. 19</span><span>Lun. 20</span><span>Mar. 21</span></div>
              </article>
              <article className="sa-panel sa-operator-panel">
                <div className="sa-panel-heading"><div><h2>État des opérateurs</h2><p>Disponibilité en temps réel</p></div><span className="sa-live-dot"><i /> EN DIRECT</span></div>
                <div className="sa-operator-list">{operators.map((operator) => <div className="sa-operator-row" key={operator.key}><OperatorLogo operator={operator.key} size={30} /><span className="sa-operator-name"><b>{operator.name}</b><small>{operator.success} de réussite</small></span><span className={`sa-operator-state ${operator.status === 'Opérationnel' ? 'good' : 'watch'}`}><i />{operator.status}</span></div>)}</div>
                <button className="sa-text-button" onClick={() => setSection('operators')}>Voir le détail des opérateurs <Icon name="chevron" size={15} /></button>
              </article>
            </div>

            <div className="sa-panel sa-table-panel">
              <div className="sa-panel-heading"><div><h2>Transactions récentes</h2><p>Derniers paiements observés sur la plateforme</p></div><button className="sa-text-button" onClick={() => setSection('transactions')}>Toutes les transactions <Icon name="chevron" size={15} /></button></div>
              <Table headers={['RÉFÉRENCE', 'MARCHAND', 'OPÉRATEUR', 'MONTANT', 'HEURE', 'STATUT']} rows={transactions.slice(0, 4).map((transaction) => [<b className="sa-mono" key="ref">{transaction.ref}</b>, transaction.merchant, transaction.operator, <b key="amount">{transaction.amount}</b>, transaction.time, <StatusPill key="status">{transaction.status}</StatusPill>])} />
            </div>
          </>}

          {section === 'merchants' && <div className="sa-panel sa-table-panel"><div className="sa-panel-heading"><div><h2>Comptes marchands</h2><p>État et activité des comptes marchands · données de démonstration</p></div><span className="sa-summary-chip">1 284 comptes</span></div><Table headers={['MARCHAND', 'IDENTIFIANT', 'SECTEUR', 'VOLUME · 30 J', 'STATUT']} rows={merchantRows.map((merchant) => [<b key="name">{merchant.name}</b>, <span className="sa-mono" key="id">{merchant.id}</span>, merchant.sector, <b key="volume">{merchant.volume}</b>, <StatusPill key="status">{merchant.status}</StatusPill>])} /></div>}

          {section === 'transactions' && <div className="sa-panel sa-table-panel"><div className="sa-panel-heading"><div><h2>Flux des paiements</h2><p>Transactions récentes tous marchands confondus · données de démonstration</p></div><span className="sa-summary-chip">8 492 aujourd’hui</span></div><Table headers={['RÉFÉRENCE', 'MARCHAND', 'OPÉRATEUR', 'MONTANT', 'HEURE', 'STATUT']} rows={transactionRows.map((transaction) => [<b className="sa-mono" key="ref">{transaction.ref}</b>, transaction.merchant, transaction.operator, <b key="amount">{transaction.amount}</b>, transaction.time, <StatusPill key="status">{transaction.status}</StatusPill>])} /></div>}

          {section === 'operators' && <div className="sa-operator-cards">{operators.map((operator) => <article className="sa-panel sa-operator-detail" key={operator.key}><div className="sa-operator-detail-head"><OperatorLogo operator={operator.key} size={42} /><span className={`sa-operator-state ${operator.status === 'Opérationnel' ? 'good' : 'watch'}`}><i />{operator.status}</span></div><h2>{operator.name}</h2><p>Performance agrégée des dernières 24 heures.</p><div className="sa-operator-stats"><span><small>Disponibilité</small><b>{operator.uptime}</b></span><span><small>Taux de réussite</small><b>{operator.success}</b></span><span><small>Latence moyenne</small><b>{operator.latency}</b></span></div></article>)}</div>}

          {section === 'users' && <div className="sa-panel sa-table-panel"><div className="sa-panel-heading"><div><h2>Accès administrateurs</h2><p>Rôles et dernière activité · données de démonstration</p></div><span className="sa-summary-chip">4 comptes</span></div><Table headers={['ADMINISTRATEUR', 'RÔLE', 'DERNIÈRE ACTIVITÉ', 'ÉTAT']} rows={adminRows.map((admin) => [<span className="sa-person" key="person"><i>{admin.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</i><span><b>{admin.name}</b><small>{admin.email}</small></span></span>, admin.role, admin.last, <StatusPill key="status">{admin.status}</StatusPill>])} /><div className="sa-readonly-note"><Icon name="lock" size={15} /> Les rôles et autorisations sont présentés à titre indicatif. La gestion réelle des accès nécessite un service d’authentification.</div></div>}

          {section === 'audit' && <div className="sa-panel sa-table-panel"><div className="sa-panel-heading"><div><h2>Activité administrative</h2><p>Actions récentes consignées dans le journal · données de démonstration</p></div><span className="sa-summary-chip">Rétention : 90 jours</span></div><Table headers={['ADMINISTRATEUR', 'ACTION', 'CIBLE', 'HEURE', 'TYPE']} rows={auditRows.map((event) => [<b key="actor">{event.actor}</b>, event.action, event.target, <span className="sa-mono" key="time">{event.time}</span>, <span className="sa-audit-tag" key="kind">{event.kind}</span>])} /><div className="sa-readonly-note"><Icon name="shield" size={15} /> Ce journal d’exemple n’est pas relié à un système d’audit réel.</div></div>}

          <footer className="sa-footer"><span>KwêTché Pay · Console Super Admin</span><span><i /> Interface de démonstration en lecture seule</span><Link href="/">Retour au site public <Icon name="arrow" size={14} /></Link></footer>
        </div>
      </section>
    </main>
  )
}
