import curr from './curr'

let defaultCurrency = 'GBP'

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

export let currencyMap = curr

export let format = (number, curcode, options) => {
  if (typeof number === 'undefined') {
    return ''
  }

  let amount = Number(number)
  if (isNaN(amount)) {
    return ''
  }

  let code = curcode || defaultCurrency
  let currency = getCurrency(code)
  let { separateGroup, omitCurrencySymbol } = options || {}

  let num = Math.abs(amount) / Math.pow(10, currency.fraction)
  let n = ((num % 1) > 0) ? 2 : 0
  let fc = n > 0 ? '\\.' : '$'
  let x = separateGroup || 3
  let re = `\\d(?=(\\d{${x}})+${fc})`
  let result = num.toFixed(Math.max(0, n)).replace(new RegExp(re, 'g'), '$&,')

  let minusSign = amount < 0 ? '-' : ''
  let symbol = !omitCurrencySymbol ? currency.symbol : ''
  return `${minusSign}${symbol}${result}`
}
