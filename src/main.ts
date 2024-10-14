import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;
let growthRate: number = 0;
let cost1 = 10;
let cost2 = 100;
let cost3 = 1000;
let chef1 = 0;
let chef2 = 0;
let chef3 = 0;

const gameName = "Sushi Stop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const sushiCounter = document.createElement("p");
app.append(sushiCounter);
const sushiRate = document.createElement("p");
app.append(sushiRate);
const sushiChefs1 = document.createElement("p");
app.append(sushiChefs1);
const sushiChefs2 = document.createElement("p");
app.append(sushiChefs2);
const sushiChefs3 = document.createElement("p");
app.append(sushiChefs3);


const button = document.createElement("button");
button.textContent = "Click Me 🍣";
app.append(button);

const growth1button = document.createElement("button");
growth1button.textContent = `Purchase home sushi chefs (${cost1}🍣 each)`;
app.append(growth1button);
growth1button.disabled = true;

const growth2button = document.createElement("button");
growth2button.textContent = `Purchase amateur sushi chefs (${cost2}🍣 each)`;
app.append(growth2button);
growth2button.disabled = true;

const growth3button = document.createElement("button");
growth3button.textContent = `Purchase pro sushi chefs (${cost3}🍣 each)`;
app.append(growth3button);
growth3button.disabled = true;


const setCounter = (count: number) => {
    counter = count;
    sushiCounter.innerHTML = `number of 🍣: ${counter.toFixed(0)}`;
    growth1button.disabled = counter < cost1;
    growth2button.disabled = counter < cost2;
    growth3button.disabled = counter < cost3;
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
  if (counter >= cost1) {
    setCounter(counter - cost1);
      growthRate += 0.1;
      cost1 *= 1.15;
      chef1 += 1;
      sushiRate.innerHTML = `sushi/s: ${growthRate}`;
      sushiChefs1.innerHTML = `home sushi shefs: ${chef1}`
  }
});
growth2button.addEventListener("click", () => {
  if (counter >= cost2) {
    setCounter(counter - cost2);
      growthRate += 2;
      cost2 *= 1.15;
      chef2 += 1;
      sushiRate.innerHTML = `sushi/s: ${growthRate}`;
      sushiChefs2.innerHTML = `amateur sushi shefs: ${chef2}`
  }
});
growth3button.addEventListener("click", () => {
  if (counter >= cost3) {
    setCounter(counter - cost3);
      growthRate += 50;
      cost3 *= 1.15;
      chef3 += 1;
      sushiRate.innerHTML = `sushi/s: ${growthRate}`;
      sushiChefs3.innerHTML = `pro sushi shefs: ${chef3}`
  }
});
