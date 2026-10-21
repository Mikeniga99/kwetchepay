'use client'

import { Icon } from '@/components/Icon'
import { INITIAL_WEBHOOK_LOGS, type WebhookLog } from '@/lib/dashboard-data'
import { useState } from 'react'
import { useDashboard } from '../dashboard-context'

export default function DashboardDevelopersPage() {
  const { isLive } = useDashboard()

  // Key reveal states
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Webhook settings
  const [webhookUrl, setWebhookUrl] = useState('https://api.gomarket.bj/webhooks/kwetchepay')
  const [savedUrl, setSavedUrl] = useState(false)
  const [testingWebhook, setTestingWebhook] = useState(false)
  const [logs, setLogs] = useState<WebhookLog[]>(INITIAL_WEBHOOK_LOGS)
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null)

  const keys = {
    test: {
      pub: 'kp_test_pk_80492_e7f39b21a8d0',
      sec: 'kp_test_sk_91823_c4b91a7e28f09d21'
    },
    live: {
      pub: 'kp_live_pk_11029_a5d82f33c1a9',
      sec: 'kp_live_sk_44921_b8e20f1a92c0d832'
    }
  }

  const currentKeys = isLive ? keys.live : keys.test

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedUrl(true)
    setTimeout(() => setSavedUrl(false), 2500)
  }

  const handleSimulateWebhook = () => {
    setTestingWebhook(true)
    setTimeout(() => {
      setTestingWebhook(false)
      const newLog: WebhookLog = {
        id: `wh_log_${Date.now()}`,
        event: 'payment.success',
        statusCode: 200,
        timestamp: 'À l’instant',
        payload: JSON.stringify(
          {
            event: 'payment.success',
            test_mode: !isLive,
            data: {
              id: `pay_${Math.random().toString(36).substring(2, 9)}`,
              amount: 15000,
              currency: 'XOF',
              channel: 'mtn_momo',
              status: 'success',
              reference: `#KP-${Math.floor(80000 + Math.random() * 9999)}`,
              message: 'Test webhook simulé depuis le tableau de bord',
            },
          },
          null,
          2,
        ),
      }
      setLogs([newLog, ...logs])
    }, 700)
  }

  return (
    <div>
      <div className="dash-title-row">
        <div>
          <h1>Développeurs & Webhooks</h1>
          <p>Gérez vos identifiants d’API, sécurisez vos échanges et testez vos intégrations techniques.</p>
        </div>
      </div>

      {/* API Keys Panel */}
      <div className="dash-panel" style={{ marginBottom: '24px' }}>
        <div className="dash-panel-header">
          <div>
            <h3>Clés d’API (Environnement {isLive ? 'Production' : 'Test'})</h3>
            <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
              {isLive
                ? 'Utilisez ces clés pour encaisser des paiements réels.'
                : 'Utilisez ces clés pour tester vos intégrations avec des numéros de simulation.'}
            </small>
          </div>
          <span
            className="dash-mode-badge"
            style={{
              background: isLive ? '#e6fffa' : '#fff8e6',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              color: isLive ? '#0694a2' : '#925700',
              fontWeight: 700
            }}
          >
            <i style={{ background: isLive ? '#0694a2' : '#e59000' }} />
            {isLive ? 'Production' : 'Simulation'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Public Key */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '6px' }}>
              Clé publique (Publishable Key)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="form-control"
                readOnly
                value={currentKeys.pub}
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', background: '#fafbfa' }}
              />
              <button
                className="button button-secondary"
                style={{ minHeight: '44px', fontSize: '12px', whiteSpace: 'nowrap' }}
                onClick={() => copyToClipboard(currentKeys.pub, 'pub')}
              >
                {copiedKey === 'pub' ? '✓ Copié' : 'Copier'}
              </button>
            </div>
          </div>

          {/* Secret Key */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '6px' }}>
              Clé secrète (Secret Key) — Ne jamais exposer côté client
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="form-control"
                readOnly
                type={showSecretKey ? 'text' : 'password'}
                value={currentKeys.sec}
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', background: '#fafbfa' }}
              />
              <button
                className="button button-secondary"
                style={{ minHeight: '44px', fontSize: '12px', whiteSpace: 'nowrap' }}
                onClick={() => setShowSecretKey(!showSecretKey)}
              >
                {showSecretKey ? 'Masquer' : 'Révéler'}
              </button>
              <button
                className="button button-secondary"
                style={{ minHeight: '44px', fontSize: '12px', whiteSpace: 'nowrap' }}
                onClick={() => copyToClipboard(currentKeys.sec, 'sec')}
              >
                {copiedKey === 'sec' ? '✓ Copié' : 'Copier'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks Panel */}
      <div className="dash-panel" style={{ marginBottom: '24px' }}>
        <div className="dash-panel-header">
          <div>
            <h3>Configuration des Webhooks</h3>
            <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
              KwêTché Pay enverra des requêtes HTTP POST avec signature HMAC à cette adresse lors de chaque événement de paiement.
            </small>
          </div>
          <button
            className="button button-secondary"
            style={{ minHeight: '34px', fontSize: '11px' }}
            disabled={testingWebhook}
            onClick={handleSimulateWebhook}
          >
            {testingWebhook ? 'Envoi en cours...' : '⚡ Simuler un webhook de test'}
          </button>
        </div>

        <form onSubmit={handleSaveWebhook}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="wh-url">URL de votre serveur (Endpoint)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="form-control"
                id="wh-url"
                type="url"
                required
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px' }}
              />
              <button
                type="submit"
                className="button button-primary"
                style={{ minHeight: '44px', fontSize: '12px', whiteSpace: 'nowrap' }}
              >
                {savedUrl ? '✓ Enregistré !' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </form>

        <div style={{ background: '#f8faf9', border: '1px solid var(--line)', borderRadius: '8px', padding: '12px 16px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--muted)' }}>Clé secrète de signature : </span>
            <code style={{ fontFamily: 'var(--font-dm-mono)', fontWeight: 700 }}>whsec_98f42a1bc7e30d</code>
          </div>
          <button
            style={{ background: 'none', border: 'none', color: 'var(--orange)', cursor: 'pointer', fontWeight: 700, fontSize: '11px' }}
            onClick={() => copyToClipboard('whsec_98f42a1bc7e30d', 'whsec')}
          >
            {copiedKey === 'whsec' ? '✓ Copié' : 'Copier'}
          </button>
        </div>

        <div style={{ marginTop: '20px', borderTop: '1px dashed var(--line)', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '13px', marginBottom: '10px' }}>🔐 Vérification des signatures (Node.js)</h4>
          <pre style={{ background: '#f1f3f2', padding: '12px', borderRadius: '6px', fontSize: '11px', overflowX: 'auto' }}>
            <code>{`const crypto = require('crypto');
const signature = req.headers['x-kp-signature'];
const hmac = crypto.createHmac('sha256', 'whsec_...')
                  .update(JSON.stringify(req.body))
                  .digest('hex');

if (signature === hmac) { /* Valide */ }`}</code>
          </pre>
        </div>
      </div>

      {/* Webhook Events Logs */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <div>
            <h3>Journal des événements Webhooks récents</h3>
            <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Historique des 10 dernières livraisons vers votre serveur</small>
          </div>
        </div>

        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>ÉVÉNEMENT</th>
                <th>CODE HTTP</th>
                <th>HORODATAGE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <code style={{ color: 'var(--orange)', fontWeight: 700, fontFamily: 'var(--font-dm-mono)' }}>
                      {log.event}
                    </code>
                  </td>
                  <td>
                    <span className="status success" style={{ fontSize: '10px' }}>
                      <i /> {log.statusCode} OK
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{log.timestamp}</span>
                  </td>
                  <td>
                    <button
                      className="button button-secondary"
                      style={{ minHeight: '28px', padding: '0 8px', fontSize: '11px' }}
                      onClick={() => setSelectedLog(log)}
                    >
                      Voir le payload JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal JSON Payload */}
      {selectedLog && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedLog(null)}>
          <div className="dash-modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span className="pill-badge" style={{ marginBottom: '4px' }}>Payload Webhook</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{selectedLog.event}</h3>
              </div>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                onClick={() => setSelectedLog(null)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <pre style={{ background: '#0a1c1a', color: '#88e0be', padding: '16px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', maxHeight: '350px' }}>
              <code>{selectedLog.payload}</code>
            </pre>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="button button-secondary"
                style={{ minHeight: '38px', fontSize: '12px' }}
                onClick={() => setSelectedLog(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
