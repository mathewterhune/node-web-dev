import * as http from "http";
import * as util from "util";
import * as os from "os";

import { sniffOn } from './httpsniffer.mjs';

// REQUEST ROUTING

const listenOn = "http://localhost:8124";
const server = http.createServer();

server.on("request", (req, res) => {
  var requrl = new URL(req.url, listenOn); // base URL

  // Depending on the path, either homePage or osInfo functions are called
  if (requrl.pathname === "/") homePage(req, res);
  else if (requrl.pathname === "/osinfo") osInfo(req, res);
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("badURL " + req.url);
  }
});

server.listen(new URL(listenOn).port);
sniffOn(server);                        // Sniffing the server for requests and events
console.log(`Listening on ${listenOn}`);

function homePage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    `<html><head><title>Hello, world!</title></head>
        <body><h1>Hello, world!</h1>
        <p><a href='/osinfo'>OS Info</a></p>
        </body></html>`
  );
}

function osInfo(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    `<html><head><title>Operating System Info</title></head>
    <body><h1>Operating System Info</h1>
    <table>
    <tr><th>TMP Dir</th><td>${os.tmpdir()}</td></tr>
    <tr><th>Host Name</th><td>${os.hostname()}</td></tr>
    <tr><th>OS Type</th><td>${os.type()} ${os.platform()}
    ${os.arch()} ${os.release()}</td></tr>
    <tr><th>Uptime</th><td>${os.uptime()}
    ${util.inspect(os.loadavg())}</td></tr>
    <tr><th>Memory</th><td>total: ${os.totalmem()} free:
    ${os.freemem()}</td></tr>
    <tr><th>CPU's</th><td><pre>${util.inspect(os.cpus())}</pre></td></tr>
    <tr><th>Network</th><td><pre>${util.inspect(os.networkInterfaces())}</
    pre></td></tr>
    </table>
    </body></html>`
  );
}
