const { Router } = require('express');
const { getCollection, getDocument, updateDocument } = require('../../clients/FirebaseClient');
const LightService = require('./LightService');

const router = Router();
const lightService = new LightService();

router.post('/update', async (req, res, next) => {
	try {
		const { lights, userId } = req.body;
		const { networkId } = await getDocument(`users/${userId}`);

		const lightPromises = lights.map(async light => {
			const result = await updateDocument(`networks/${networkId}/lights/${light._id}`, light);
			return result;
		});
		await Promise.all(lightPromises);

		const network = await getDocument(`networks/${networkId}`);
		await lightService.updateLights(lights, network);

		return res.send('done');
	} catch (err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const { userId } = req.query;
		const { networkId } = await getDocument(`users/${userId}`);
		const lights = await getCollection(`networks/${networkId}/lights`);
		return res.send(lights);
	} catch (err) {
		next(err);
	}
});

module.exports = router;