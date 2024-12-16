import axios from "axios";

export const fetchExchangeRates = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    let result
    try {
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        result = response.data.conversion_rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }

    return { uzs: result.UZS, usd: result.USD, eur: result.EUR }
};

