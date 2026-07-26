# Biz Docs Studio

One small Vue 3 app with three tools for freelance client work:

- **Invoice** — bill a client for logged hours
- **Proposal** — scope new work into stages & milestones with time estimates
- **Update Notes** — write a client-facing summary of what shipped

Each tool has a live "paper" preview on the right that matches what prints /
saves as a PDF (browser Print → Save as PDF, margins "None" for best results).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build in dist/
```

## Folder structure

```
src/
  config/            Your info — edit once, used everywhere
    myInfo.js          Your name, address, bank details
    clients.js         Client list (name, address, default hourly rate)

  composables/       All state + logic, no UI. One per tool, easy to test.
    useInvoice.js
    useProposal.js
    useUpdateNotes.js
    usePrint.js         Shared window.print() trigger

  components/
    layout/            App shell (sidebar nav)
    common/             ToolPage.vue — shared editor/preview two-column layout
    invoice/            Editor form + paper preview
    proposal/
    updates/

  views/              One routed page per tool, wires composable -> components
  router/              /invoice, /proposal, /updates
  assets/main.css      Tailwind + shared "field-*", "panel", "paper" classes
                        and the print stylesheet (@media print)
```

## Adding a client

Edit `src/config/clients.js`:

```js
{
  id: 'new-client',
  name: 'New Client Pvt Ltd',
  address: '123 Main St, Colombo',
  defaultRate: 800   // LKR/hour, prefills new invoice tasks
}
```

It'll show up in the "Billed to" / "Prepared for" dropdowns automatically.

## Design notes

All three documents share one visual identity (teal/ink palette, Sora display
type, JetBrains Mono for figures, and the folded-corner mark from your original
proposal cover) so an invoice, proposal, and update note all look like they
came from the same studio — rather than three unrelated templates.

## Extending

- Want a fourth document type? Copy the `invoice/` pattern: one composable
  (state + computed totals), one editor component, one preview component,
  one view, one router entry.
- Want to save drafts between sessions? Add `localStorage` persistence inside
  each composable's `ref`s — they're already isolated from the UI, so this is
  a small, contained change.
