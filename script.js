const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');

// Add a list of currency codes
const currencyList = ["USD", "EUR", "GBP", "PKR", "INR", "JPY", "CAD", "AUD", "CNY", "AED"];

currencyList.forEach(code => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.value = option2.value = code;
  option1.text = option2.text = code;
  fromCurrency.add(option1);
  toCurrency.add(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "PKR";

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching exchange rates. Try again later.";
    console.error(error);
  }
}
