import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;
let growthRate: number = 0;

const gameName = "My ok amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const sushiCounter = document.createElement("p");
app.append(sushiCounter);
const sushiChefs = document.createElement("p");
app.append(sushiChefs);

const button = document.createElement("button");
button.textContent = "Click Me 🍣";
app.append(button);

const growth1button = document.createElement("button");
growth1button.textContent = "Purchase sushi chefs (10🍣 each)";
app.append(growth1button);
growth1button.disabled = true;

const growth2button = document.createElement("button");
growth2button.textContent = "Purchase sushi chefs (100🍣 each)";
app.append(growth2button);
growth2button.disabled = true;

const growth3button = document.createElement("button");
growth3button.textContent = "Purchase sushi chefs (1000🍣 each)";
app.append(growth3button);
growth3button.disabled = true;

app.append(button);
const setCounter = (count: number) => {
  counter = count;
  sushiCounter.innerHTML = `number of 🍣: ${counter.toFixed(0)}`;
    growth1button.disabled = counter < 10;
    growth2button.disabled = counter < 100;
    growth3button.disabled = counter < 1000;
};
button.addEventListener("click", () => setCounter(counter + 1));

let lastTimestamp: number = performance.now();
let deltaTime: number = 0;

const animate = (timestamp: number) => {
  deltaTime += ((timestamp - lastTimestamp) / 1000) * growthRate;
  lastTimestamp = timestamp;

  if (deltaTime >= 1) {
    setCounter(counter + deltaTime);
    deltaTime = 0;
  }
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

growth1button.addEventListener("click", () => {
  if (counter >= 10) {
    setCounter(counter - 10);
    growthRate += 0.1;
    sushiChefs.innerHTML = `number of sushi chefs: ${growthRate}`;
  }
});
growth2button.addEventListener("click", () => {
    if (counter >= 100) {
        setCounter(counter - 100);
        growthRate += 2;
        sushiChefs.innerHTML = `number of sushi chefs: ${growthRate}`;
    }
});
growth3button.addEventListener("click", () => {
    if (counter >= 1000) {
        setCounter(counter - 1000);
        growthRate += 50;
        sushiChefs.innerHTML = `number of sushi chefs: ${growthRate}`;
    }
});
