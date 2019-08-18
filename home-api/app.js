const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const LightService = require('./lib/LightService');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandler');

const app = express();
const lightService = new LightService();

app.use(cors());
app.use(bodyParser.json());

app.post('/updateLights', async (req, res, next) => {
	try {

		console.log('> /updateLights ~ called with: ' + JSON.stringify(req.body, null, 4));
		const { lights, network } = req.body;

		// Update the lights
		console.log('> updateLights~ updating the lights\' state');
		await lightService.updateLights(lights, network);

		return res.send('done');

	} catch (err) {
		next(err);
	}
});

app.use(ErrorHandlerMiddleware);

app.listen(config.port, () =>
  console.log(`Home API listening on port ${config.port}!`),
);