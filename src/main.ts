import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;

const gameName = "My ok amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const sushiCounter = document.createElement("p");
app.append(sushiCounter);

const button = document.createElement("button");
button.textContent = "Click Me 🍣";
app.append(button);
const setCounter = (count: number) => {
  counter = count;
  sushiCounter.innerHTML = `number of 🍣: ${counter.toFixed(0)}`;
};
button.addEventListener("click", () => setCounter(counter + 1));


let lastTimestamp: number = performance.now();
let deltaTime: number = 0;

const animate = (timestamp: number) => {
    deltaTime += (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (deltaTime >= 1) {
        setCounter(counter + deltaTime);
        deltaTime = 0;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
