import { Pulser } from './pulser.mjs';

// Instantiate a Pulser object
const pulser = new Pulser();
// Handler Function
pulser.on('pulse', () => {
    console.log(`${new Date().toISOString()} pulse event received`);
});
// Start it pulsing
pulser.start();