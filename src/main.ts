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

const growthbutton = document.createElement("button");
growthbutton.textContent = "Purchase sushi chefs (10🍣 each)";
app.append(growthbutton);
growthbutton.disabled = true;

app.append(button);
const setCounter = (count: number) => {
  counter = count;
    sushiCounter.innerHTML = `number of 🍣: ${counter.toFixed(0)}`;
    growthbutton.disabled = counter < 10;
};
button.addEventListener("click", () => setCounter(counter + 1));

let lastTimestamp: number = performance.now();
let deltaTime: number = 0;

const animate = (timestamp: number) => {
    deltaTime += (timestamp - lastTimestamp) / 1000 * growthRate;
  lastTimestamp = timestamp;

  if (deltaTime >= 1) {
    setCounter(counter + deltaTime);
    deltaTime = 0;
  }
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

growthbutton.addEventListener("click", () => {
    if (counter >= 10) {
        setCounter(counter - 10);
        growthRate += 1;
        sushiChefs.innerHTML = `number of sushi chefs: ${growthRate}`;
    }
});
