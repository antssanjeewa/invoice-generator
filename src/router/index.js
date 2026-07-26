import { createRouter, createWebHistory } from 'vue-router'
import InvoiceView from '@/views/InvoiceView.vue'
import ProposalView from '@/views/ProposalView.vue'
import UpdateNotesView from '@/views/UpdateNotesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/invoice' },
    { path: '/invoice', name: 'invoice', component: InvoiceView, meta: { label: 'Invoice' } },
    { path: '/proposal', name: 'proposal', component: ProposalView, meta: { label: 'Proposal' } },
    {
      path: '/updates',
      name: 'updates',
      component: UpdateNotesView,
      meta: { label: 'Update Notes' }
    }
  ]
})

export default router
