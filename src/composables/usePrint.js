export function usePrint() {
  const printDocument = () => {
    window.print()
  }
  return { printDocument }
}
