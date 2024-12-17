export function convertTransactionsToUSD(transactions, rates) {
    const summary = {};

    transactions?.forEach((transaction) => {
        const { category, price, currency
        } = transaction;
        const newCurrency = currency.toUpperCase()
        // get currency
        const rate = rates[newCurrency];
        // if currency not found
        if (rate) {
            const priceInUsd = price * rate;

            // all price
            if (summary[category]) {
                summary[category] += priceInUsd;
            } else {
                summary[category] = priceInUsd;
            }
        }
    });

    const result = Object.keys(summary).map((category) => ({
        category: category,
        totalInUSD: summary[category].toFixed(2),
    }));
    console.log(result)
    return result;
}