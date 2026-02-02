const axios = require('axios');

const USGS_GEOJSON_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

async function testUSGS() {
    try {
        console.log("Fetching USGS...");
        const response = await axios.get(USGS_GEOJSON_URL);
        console.log("Status:", response.status);
        if (response.data && response.data.features && response.data.features.length > 0) {
            console.log("Found", response.data.features.length, "earthquakes.");
            console.log("First item:", JSON.stringify(response.data.features[0].properties.title, null, 2));
        } else {
            console.log("No earthquakes found (response OK).");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testUSGS();
