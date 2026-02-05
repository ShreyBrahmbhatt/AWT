const EventEmitter = require("events");
const readline = require("readline");

const eventEmitter = new EventEmitter();

// To store event counts dynamically
const eventCount = {};

// Function to track any event
function trackEvent(eventName, message) {
  if (!eventCount[eventName]) {
    eventCount[eventName] = 0;
  }
  eventCount[eventName]++;
  console.log(message);
}

// Dynamic event listener (catch-all style)
eventEmitter.on("event", (eventName, message) => {
  trackEvent(eventName, message);
});

// Summary event
eventEmitter.on("summary", () => {
  console.log("\n EVENT SUMMARY");
  console.log("----------------");
  if (Object.keys(eventCount).length === 0) {
    console.log("No events triggered yet.");
    return;
  }
  for (let event in eventCount) {
    console.log(`${event}: ${eventCount[event]} times`);
  }
});

// Read input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n🎯 Event Maestro Started");
console.log("Commands:");
console.log("login <username>");
console.log("logout <username>");
console.log("purchase <username> <item>");
console.log("update <username> <field>");
console.log("summary");
console.log("exit\n");

rl.on("line", (input) => {
  const args = input.trim().split(" ");
  const command = args[0];

  switch (command) {
    case "login":
      eventEmitter.emit(
        "event",
        "user-login",
        `LOGIN: ${args[1]} logged in`
      );
      break;

    case "logout":
      eventEmitter.emit(
        "event",
        "user-logout",
        `LOGOUT: ${args[1]} logged out`
      );
      break;

    case "purchase":
      eventEmitter.emit(
        "event",
        "user-purchase",
        `PURCHASE: ${args[1]} bought ${args[2]}`
      );
      break;

    case "update":
      eventEmitter.emit(
        "event",
        "profile-update",
        `UPDATE: ${args[1]} updated ${args[2]}`
      );
      break;

    case "summary":
      eventEmitter.emit("summary");
      break;

    case "exit":
      console.log("Exiting Event Maestro");
      rl.close();
      break;

    default:
      console.log(" Invalid command");
  }
});
