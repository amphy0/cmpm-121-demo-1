import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface Item {
  name: string;
  cost: number;
  rate: number;
  quantity: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Home Sushi Chef", cost: 10, rate: 0.1, quantity: 0, description: "friendly home cook"},
    { name: "Amateur Sushi Chef", cost: 100, rate: 2, quantity: 0, description: "amateur thats been practicing" },
    { name: "Pro Sushi Chef", cost: 1000, rate: 50, quantity: 0, description: "he's a pro, rolling and serving" },
    { name: "Sushi Restaurant", cost: 10000, rate: 800, quantity: 0, description: "the production power of a whole restuarant" },
    { name: "Sushi Factory", cost: 100000, rate: 9000, quantity: 0, description: "they have factories for this??" },
];

let counter: number = 0;
let growthRate: number = 0;

const gameName = "Sushi Stop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const sushiCounter = document.createElement("p");
app.append(sushiCounter);
const sushiRate = document.createElement("p");
app.append(sushiRate);

const itemElements: {
  button: HTMLButtonElement;
  label: HTMLParagraphElement;
}[] = availableItems.map((item) => {
  const label = document.createElement("p");
  const button = document.createElement("button");
  button.textContent = `Purchase ${item.name} (${item.cost}🍣 each)`;
  button.disabled = true;
  app.append(button, label);
  return { button, label };
});

const button = document.createElement("button");
button.textContent = "Make a sushi 🍣";
app.append(button);

const updateUI = () => {
  sushiCounter.innerHTML = `number of 🍣: ${counter.toFixed(0)}`;
  sushiRate.innerHTML = `sushi/s: ${growthRate.toFixed(1)}`;

  availableItems.forEach((item, index) => {
    itemElements[index].button.disabled = counter < item.cost;
    itemElements[index].label.innerHTML = `${item.name}s: ${item.quantity}`;
  });
};

const setCounter = (count: number) => {
  counter = count;
  updateUI();
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

availableItems.forEach((item, index) => {
  itemElements[index].button.addEventListener("click", () => {
    if (counter >= item.cost) {
      setCounter(counter - item.cost);
      growthRate += item.rate;
      item.cost *= 1.15;
      item.quantity += 1;
      itemElements[index].button.textContent =
        `Purchase ${item.name} (${item.cost.toFixed(0)}🍣 each)`;
      updateUI();
    }
  });
});

updateUI();
