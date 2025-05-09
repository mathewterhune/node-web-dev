## Chapter 01 -

pass

## Chapter 02 -

pass

## Chapter 03 - Exporting Node.js Modules

The export keyword can be put in front of any top level declaration, such as variable, fuinction, or class declarations

`export function next() { .. }` := named export, can be functions or objects class defn's

The intent of both is essentiall the same: to make function or other object available to code outside the module. But instead of explicitly creating an object, `module.exports` we're simply declaring what is to be exported.

`export default` -- can be done once per module

---
Remember that the objects injected into CommonJS modeuls are not available to ES6 modules.

---

### Injected objects in ES6 Modules

ES6 modules do not receive the __dirname and the__filename objects or other objects that are injected into CommonJS modules
`import.meta` is the only value injected into ES6 modules. In Node.js it contains a single field `url`. This is the URL from which the currently executing module was loaded.

## Chapter 04 - HTTP Servers and Clients

- basic understanding of the HTTPServer and HTTPClient
- How to create an application on the Node.js platform

Build a simple application using `HTTPServer`, use Express to create an application for computing Fobancci numbers which can be computationally expensive; which is used to explore why its important to not block the event queue in Node.js and what happens to applications that do.

- Whici will be used to then create a simple background REST (Representational State Transfer), an HTTP client for making requests on that server

Covers

1. Sending and receiving events using the EventEmitter pattern
2. Understanding an HTTP server application by building an application
3. Web application frameworks
4. Using express framework to build a simple application
5. Handling computation intensive calculations in an Express application
6. Making HTTP Client Requests
7. **Creating a simple REST service with Express**

### Sending and Receiving Events using the EventEmitter Pattern

`EventEmitter`

- Is one of the core idioms of Node.js, emmiting events from an object is one of the  primary mechanisms of that architecture.
- it is an object that gives notifications (events) at different points in its lifecycle
- so much a part of the Node.js, they are used everywhere

`HTTPServer` and `HTTPClient` objects are both subclasses of `EventEmitter`.

**pulser.mjs**
```
import EventEmitter from 'events';

The purpose of the pulser class is to send a timed event once a second to any listeners,
setInterval kicks off a repeated callback execution that is scheduled for every second and calls emit
to send the pulse events to any listeners

export class Pulser extends EventEmitter {
    start () {
        setInterval(() => {

            console.log(`${new Date().toISOString()} >>>> pulse`);
            this.emit('pulse');
            console.log(`${new Date().toISOString()} <<<< pulse`)
        }, 1000);
    }
}
```

This class inherits from EventEmitter and provides a new method.

- Prior to arrow functions our callbacks would have used a regular function, and `this` would not have referred to the Pulser object instance; Instead, `this` would have referred to some other ojbect relatedto the `setInterval` function
- Attribute of the arrow function is that `this` inside the arrow function has the same value as `this` in the surrounding context. This means, in this case, that `this` does refer the the Pulser object instance.

**pulsed.mjs**

```
import { Pulser } from './pulser.mjs';

// Instantiate a Pulser object
const pulser = new Pulser();
// Handler Function
pulser.on('pulse', () => {
    console.log(`${new Date().toISOString()} pulse event received`);
});
// Start it pulsing
pulser.start();
```

creates Pulser object and consume its pulse events. Calling `pulser.on('pulse')` sets up an event
listener for the pulse events to invoke the callback function. Where it then calls the start method to get the process going.

Results
```
2025-05-08T22:55:32.220Z >>>> pulse
2025-05-08T22:55:32.225Z pulse event received
2025-05-08T22:55:32.225Z <<<< pulse
2025-05-08T22:55:33.232Z >>>> pulse
2025-05-08T22:55:33.232Z pulse event received
2025-05-08T22:55:33.232Z <<<< pulse
2025-05-08T22:55:34.245Z >>>> pulse
2025-05-08T22:55:34.245Z pulse event received
```

---

#### EventEmitter Theory
Using the EventEmitter class, your code emits events that other code can receive. This is a way 
to connect two separated parts of your program. 

The event name can be anything that makes sense to you and you can name as many evetnt names as you like. 

*Event names are simply defined by calling `.emit` with the event name*

An object sends events using the `.emit` function, these events are sent to any listeners that
have registered to receive events from the object. The programs register to receive an event by calling that 
objects `.on` method, giving the events name and an event handler function.

There is not central distribution point for all events. Instead, each instance of `EventEmitter` object mangages its own set of listeners and distributes its events to those listeners.

To send data with an event: `this.emit('eventName', data1, data2, ...);`. When a program receives the event, the data appears as arguments to the callback function. So, your program listens to this event as follows.

```
emitter.on('eventName', (data1, data2, ...theAgrs) => {
    // act on event;
});
```

**There is no handshaking between events**

#### Understanding HTTP server applications

#### ES2015 multiline and template strings

#### HTTP Sniffer - Listening to the HTTP Conversation