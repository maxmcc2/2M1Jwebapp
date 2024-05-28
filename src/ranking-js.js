/* script.js */
const sliders = [
  { range: 'myRangeService', display: 'valueDisplayService', button: 'naService' },
  { range: 'myRangeChips', display: 'valueDisplayChips', button: 'naChips' },
  { range: 'myRangeSalsa', display: 'valueDisplaySalsa', button: 'naSalsa' },
  { range: 'myRangeQueso', display: 'valueDisplayQueso', button: 'naQueso' },
  { range: 'myRangeMeal', display: 'valueDisplayMeal', button: 'naMeal' },
  { range: 'myRangeDrinks', display: 'valueDisplayDrinks', button: 'naDrinks' }
];

sliders.forEach(slider => {
  const range = document.querySelector(`#${slider.range}`);
  const display = document.querySelector(`#${slider.display}`);
  const button = document.querySelector(`#${slider.button}`);
  let prevValue = range.value; // Variable to store the previous value

  range.addEventListener('input', () => updateValue(range, display, prevValue));
  button.addEventListener('click', () => toggleNA(range, display));
});

document.querySelector('#resetButton').addEventListener('click', resetSliders);

function updateValue(range, display, prevValue) {
  const value = range.value;
  if (value !== prevValue) { // Check if the value has changed
    display.textContent = value;
    const percent = (value - range.min) / (range.max - range.min);
    const offset = range.offsetWidth * percent - (display.offsetWidth / 3);
    display.style.left = `${offset}px`;
    display.style.top = `${range.offsetHeight + 10}px`; // Position the value below the slider
    display.style.display = 'block'; // Show the value display
    prevValue = value; // Update the previous value
  }
}

function toggleNA(range, display) {
  if (range.disabled) {
    range.disabled = false;
    display.style.display = 'none';
  } else {
    range.disabled = true;
    display.textContent = 'N/A';
    display.style.left = `${range.offsetWidth / 2 - display.offsetWidth / 2}px`;
    display.style.top = `${range.offsetHeight + 10}px`;
    display.style.display = 'block';
  }
}

function resetSliders() {
  sliders.forEach(slider => {
    const range = document.querySelector(`#${slider.range}`);
    const display = document.querySelector(`#${slider.display}`);
    range.value = 5; // Reset the slider to the middle position
    range.disabled = false;
    display.style.display = 'none'; // Hide the value display
  });
}
