const apiKey = import.meta.env.VITE_API_KEY;
export const fetchCurrency = async () => {
    let data
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        data = await response.json();
    } catch (error) {
        console.error("Valyuta kurslarini olishda xatolik:", error);
    }

    return data.conversion_rates
}