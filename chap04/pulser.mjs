import EventEmitter from 'events';

// The purpose of the pulser class is to send a timed event once a second to any listeners, setInterval kicks off a repeated callback execution that is scheduled for every second and calls emit to send the pulse events to any listeners

export class Pulser extends EventEmitter {
    start () {
        setInterval(() => {

            console.log(`${new Date().toISOString()} >>>> pulse`);
            this.emit('pulse');
            console.log(`${new Date().toISOString()} <<<< pulse`)
        }, 1000);
    }
}