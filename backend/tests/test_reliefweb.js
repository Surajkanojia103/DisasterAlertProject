const axios = require('axios');

const RELIEFWEB_API_URL = 'https://api.reliefweb.int/v1/disasters?appname=dars_app&limit=10&sort=date:desc';

async function testReliefWeb() {
    try {
        console.log("Fetching ReliefWeb...");
        const response = await axios.get(RELIEFWEB_API_URL, {
            headers: { 'User-Agent': 'DARS-App/1.0' }
        });
        console.log("Status:", response.status);
        if (response.data && response.data.data && response.data.data.length > 0) {
            console.log("First item:", JSON.stringify(response.data.data[0], null, 2));
        } else {
            console.log("No data found or structure is different.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testReliefWeb();
