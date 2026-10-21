export type PaymentChannel = 'MTN MoMo' | 'Moov Money' | 'Celtiis Cash'
export type TransactionStatus = 'success' | 'pending' | 'failed'

export interface Transaction {
  id: string
  ref: string
  customerName: string
  customerPhone: string
  customerEmail: string
  channel: PaymentChannel
  amount: number
  fee: number
  netAmount: number
  status: TransactionStatus
  date: string
  time: string
  description: string
}

export interface PaymentLink {
  id: string
  code: string
  title: string
  amount: number | null // null = libre
  currency: string
  active: boolean
  createdAt: string
  paymentsCount: number
  totalCollected: number
}

export interface WebhookLog {
  id: string
  event: string
  statusCode: number
  timestamp: string
  payload: string
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'pay_9xK81qLs0',
    ref: '#KP-80492',
    customerName: 'Afi Koudjo',
    customerPhone: '+229 01 97 12 34 56',
    customerEmail: 'afi.koudjo@gmail.com',
    channel: 'MTN MoMo',
    amount: 48500,
    fee: 970,
    netAmount: 47530,
    status: 'success',
    date: '19 Oct 2026',
    time: '18:42',
    description: 'Commande #4891 - Pack Informatique',
  },
  {
    id: 'pay_8aB72mPn1',
    ref: '#KP-80491',
    customerName: 'Serge Ehouzou',
    customerPhone: '+229 01 95 88 12 34',
    customerEmail: 'serge.e@yahoo.fr',
    channel: 'Moov Money',
    amount: 32000,
    fee: 640,
    netAmount: 31360,
    status: 'success',
    date: '19 Oct 2026',
    time: '17:15',
    description: 'Abonnement Mensuel Pro',
  },
  {
    id: 'pay_7vC63kQm2',
    ref: '#KP-80490',
    customerName: 'Diane Mensah',
    customerPhone: '+229 01 40 55 67 89',
    customerEmail: 'diane.mensah@outlook.com',
    channel: 'Celtiis Cash',
    amount: 74200,
    fee: 1484,
    netAmount: 72716,
    status: 'pending',
    date: '19 Oct 2026',
    time: '16:50',
    description: 'Facture #2026-104',
  },
  {
    id: 'pay_6uD54jRl3',
    ref: '#KP-80489',
    customerName: 'Benoît Agbodjan',
    customerPhone: '+229 01 96 33 22 11',
    customerEmail: 'benoit.a@gmail.com',
    channel: 'MTN MoMo',
    amount: 15000,
    fee: 300,
    netAmount: 14700,
    status: 'success',
    date: '19 Oct 2026',
    time: '15:20',
    description: 'Billet séminaire Fintech Cotonou',
  },
  {
    id: 'pay_5tE45iSk4',
    ref: '#KP-80488',
    customerName: 'Chantal Hounhouedo',
    customerPhone: '+229 01 94 11 22 33',
    customerEmail: 'chantal.h@gmail.com',
    channel: 'Moov Money',
    amount: 125000,
    fee: 2500,
    netAmount: 122500,
    status: 'success',
    date: '19 Oct 2026',
    time: '14:05',
    description: 'Prestation de service - Maintenance',
  },
  {
    id: 'pay_4sF36hTj5',
    ref: '#KP-80487',
    customerName: 'Gaston Kpadonou',
    customerPhone: '+229 01 97 09 87 65',
    customerEmail: 'gaston.k@yahoo.com',
    channel: 'MTN MoMo',
    amount: 25000,
    fee: 500,
    netAmount: 24500,
    status: 'failed',
    date: '19 Oct 2026',
    time: '12:30',
    description: 'Solde insuffisant portefeuille client',
  },
  {
    id: 'pay_3rG27gUi6',
    ref: '#KP-80486',
    customerName: 'Fatou Diallo',
    customerPhone: '+229 01 42 12 34 56',
    customerEmail: 'fatou.diallo@hotmail.com',
    channel: 'Celtiis Cash',
    amount: 50000,
    fee: 1000,
    netAmount: 49000,
    status: 'success',
    date: '18 Oct 2026',
    time: '20:10',
    description: 'Commande E-commerce #4880',
  },
]

export const INITIAL_PAYMENT_LINKS: PaymentLink[] = [
  {
    id: 'link_1',
    code: 'formation-dev',
    title: 'Formation Développement Web & API',
    amount: 75000,
    currency: 'XOF',
    active: true,
    createdAt: '12 Oct 2026',
    paymentsCount: 14,
    totalCollected: 1050000,
  },
  {
    id: 'link_2',
    code: 'consulting-fintech',
    title: 'Session Conseil & Stratégie Paiement',
    amount: 150000,
    currency: 'XOF',
    active: true,
    createdAt: '08 Oct 2026',
    paymentsCount: 6,
    totalCollected: 900000,
  },
  {
    id: 'link_3',
    code: 'don-libre',
    title: 'Soutien au projet bénévole',
    amount: null,
    currency: 'XOF',
    active: true,
    createdAt: '01 Oct 2026',
    paymentsCount: 38,
    totalCollected: 412500,
  },
]

export const INITIAL_WEBHOOK_LOGS: WebhookLog[] = [
  {
    id: 'wh_log_1',
    event: 'payment.success',
    statusCode: 200,
    timestamp: '19 Oct 2026 à 18:42:12',
    payload: JSON.stringify(
      {
        event: 'payment.success',
        data: {
          id: 'pay_9xK81qLs0',
          amount: 48500,
          currency: 'XOF',
          channel: 'mtn_momo',
          status: 'success',
          customer: { name: 'Afi Koudjo', phone: '+229 01 97 12 34 56' },
        },
      },
      null,
      2,
    ),
  },
  {
    id: 'wh_log_2',
    event: 'payment.success',
    statusCode: 200,
    timestamp: '19 Oct 2026 à 17:15:30',
    payload: JSON.stringify(
      {
        event: 'payment.success',
        data: {
          id: 'pay_8aB72mPn1',
          amount: 32000,
          currency: 'XOF',
          channel: 'moov_money',
          status: 'success',
        },
      },
      null,
      2,
    ),
  },
  {
    id: 'wh_log_3',
    event: 'payment.failed',
    statusCode: 200,
    timestamp: '19 Oct 2026 à 12:30:45',
    payload: JSON.stringify(
      {
        event: 'payment.failed',
        data: {
          id: 'pay_4sF36hTj5',
          amount: 25000,
          currency: 'XOF',
          reason: 'insufficient_funds',
        },
      },
      null,
      2,
    ),
  },
]
