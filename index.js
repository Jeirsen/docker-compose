const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379
});

client.set("visits", 0);

app.get("/", (req, res) => {
  process.exit(0);
  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});

/* 
  Docker compose policies
  no: Never attempt to restart this container if it stops or crashes
  always: If this container stops (for any reason) always attempt to restart it
  on-failure: Only restart if the container stops with an error code
  unless-stopped: Always restart unless we (the developers) forcibly stop it
*/
