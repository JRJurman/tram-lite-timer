// utility function
const range = (count) => [...new Array(count)].map((_, index) => index);

const onIntersection = (entries, observer) => {
  console.log({ entries, observer });
  // set all options in this observer as non-active
  [...observer.root.querySelectorAll("timer-option")].forEach((option) => {
    option.removeAttribute("active");
  });
  // get the last entry, and set it as active
  const entry = entries.at(-1);
  entry.target.setAttribute("active", "");
};

const appContainer = document.querySelector("timer-app");
const slidersContainer = document.querySelector("timer-sliders");

// minutes slider
const minuteSlider = html` <timer-slider></timer-slider> `;
slidersContainer.appendChild(minuteSlider);

const minuteScrollObserver = new IntersectionObserver(onIntersection, {
  root: minuteSlider,
});

const minuteOptions = range(90).forEach((option) => {
  const optionElement = html`<timer-option>${option}</timer-option>`;
  minuteSlider.appendChild(optionElement);
  minuteScrollObserver.observe(optionElement);
});

// seconds slider
const secondSlider = html` <timer-slider></timer-slider> `;
slidersContainer.appendChild(secondSlider);

const secondScrollObserver = new IntersectionObserver(onIntersection, {
  root: secondSlider,
});

const secondOptions = range(60).forEach((option) => {
  const optionElement = html`<timer-option>${option}</timer-option>`;
  secondSlider.appendChild(optionElement);
  secondScrollObserver.observe(optionElement);
});

const timerSelection = html`<timer-selection></timer-selection>`;
appContainer.appendChild(timerSelection);
