// Add every client you bill or send proposals/update notes to here.
// defaultRate (LKR/hour) is used to prefill new invoice tasks.

export const CLIENTS = [
  {
    id: 'shraddha-media',
    name: 'Shraddha Media Network',
    address_line1: 'No 369, Rajasinghe Mawatha',
    address_line2: 'Hewagama',
    address_line3: 'Kaduwela',
    defaultRate: 750
  }
]

export const BLANK_CLIENT = {
  id: '',
  name: '',
  address_line1: '',
  address_line2: '',
  address_line3: '',
  defaultRate: 0
}
