import curr from './curr'

export let getCurrency = (code) => {
  let currency = curr[code]
  if (!currency) {
    return {
      ...curr['___'],
      title: code,
      symbol: code
    }
  }
  return currency
}
