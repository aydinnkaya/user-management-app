export function applyGlobalFixes() {
  document.documentElement.style.overscrollBehavior = 'none'
  document.body.style.overscrollBehavior = 'none'

  document.body.style.margin = '0'
  document.body.style.padding = '0'
  document.body.style.backgroundColor = 'black'
  // document.body.style.height = '100vh'
  // document.documentElement.style.height = '100vh'
}
