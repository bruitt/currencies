import map from 'ramda/src/map'

import curr from './curr'
import countries from './countries'

let defaultCurrency = 'GBP'
let defaultDecimalSymbol = '.'

export let getCurrency = (code) => {
  let currency = curr[code]
  if (!currency) {
    return {
      ...curr['___'],
      id: code,
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

export let parse = (value, curcode, options) => {
  if (typeof value === 'undefined') {
    return ''
  }

  let amount = String(value)

  let code = curcode || defaultCurrency
  let currency = getCurrency(code)
  let decimal = (options || {}).decimalSymbol || defaultDecimalSymbol

  // Build regex to strip out everything except digits, decimal point and minus sign:
  let regex = new RegExp(`[^0-9-${decimal}]`, [ 'g' ])
  let unformatted = parseFloat(
    amount.replace(/\((.*)\)/, '-$1') // replace bracketed values with negatives
      .replace(regex, '')             // strip out any cruft
      .replace(decimal, '.')          // make sure decimal point is standard
  )

  return !isNaN(unformatted) ? (unformatted * Math.pow(10, currency.fraction)) : 0
}

export let getCountry = (code) => {
  let country = countries[code]
  if (!country) {
    return {
      ...country['__'],
      id: code,
      title: code
    }
  }
  return currency
}

export let countryMap = countries
