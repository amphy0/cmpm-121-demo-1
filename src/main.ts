import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;

const gameName = "My ok amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const sushiCounter = document.createElement("p")
app.append(sushiCounter);


const button = document.createElement("button");
button.textContent = "Click Me 🍣";
app.append(button);
const setCounter = (count: number) => {
  counter = count;
  sushiCounter.innerHTML = `number of 🍣: ${counter}`;
};
button.addEventListener("click", () => setCounter(counter + 1));
setInterval(() => setCounter(counter + 1), 1000);
