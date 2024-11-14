const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Enable CORS for development purposes

const app = express();
const port = 5000; // You can change the port if needed

app.use(cors());

// Endpoint to proxy the data from the external URL
app.get('/api/pv-forecast', async (req, res) => {
  try {
    const response = await axios.get('http://10.0.0.22/~alex/pv_forecast.json');
    res.json(response.data); // Send the data to the React app
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
