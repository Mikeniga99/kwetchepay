'use client'

import { useState } from 'react'
import { Icon } from './Icon'

type Tab = 'curl' | 'node' | 'php'

const snippets = {
  curl: `curl -X POST https://api.kwetchepay.bj/v1/payments \\
  -H "Authorization: Bearer kp_test_••••" \\
  -H "Idempotency-Key: order_80492" \\
  -d '{
    "amount": 25000,
    "currency": "XOF",
    "channel": "mobile_money"
  }'`,
  node: `const payment = await kwetchepay.payments.create({
  amount: 25000,
  currency: "XOF",
  channel: "mobile_money",
  reference: "order_80492"
});

console.log(payment.status);`,
  php: `$payment = $kwetchepay->payments->create([
  'amount' => 25000,
  'currency' => 'XOF',
  'channel' => 'mobile_money',
  'reference' => 'order_80492'
]);

echo $payment->status;`,
}

export function CodeWindow() {
  const [codeTab, setCodeTab] = useState<Tab>('curl')

  return (
    <div className="code-window observe">
      <div className="code-bar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>Créer un paiement</span>
        <span className="test-mode"><i /> MODE TEST</span>
      </div>
      <div className="code-tabs">
        {(['curl', 'node', 'php'] as const).map((tab) => <button className={codeTab === tab ? 'active' : ''} onClick={() => setCodeTab(tab)} key={tab}>{tab === 'node' ? 'Node.js' : tab.toUpperCase()}</button>)}
      </div>
      <pre><code>{snippets[codeTab]}</code></pre>
      <div className="code-response"><span><Icon name="check" size={14} /> 201 CREATED</span><b>payment_id: </b><em>"pay_8f3Kp92x"</em></div>
    </div>
  )
}
