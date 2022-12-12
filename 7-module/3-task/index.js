import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = this.render();
  }

  get elem() {
    return this.slider;
  }

  render() {
    const slider = createElement(
      `<div class="slider">
        <div class="slider__thumb" style="left: 0%">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0%"></div>
        <div class="slider__steps"></div>
      </div>`
    );

    const sliderSteps = slider.querySelector(`.slider__steps`);
    for (let index = 0; index < this.steps; index++) {
      let activeClass;
      if (index === 0) {
        activeClass = `slider__step-active`;
      }
      sliderSteps.insertAdjacentHTML(
        `beforeend`,
        `<span class="${activeClass}" data-step="${index}"></span>`
      );
    }


    slider.addEventListener(`click`, this.onclick);
    return slider;
  }

  onclick(event) {
    const elem = event.currentTarget;
    const sliderSteps = elem.querySelector(`.slider__steps`);
    const stepNode = sliderSteps.querySelectorAll(`span`);
    const sliderValue = elem.querySelector(`.slider__value`);
    const segments = stepNode.length - 1;
    const thumb = elem.querySelector(`.slider__thumb`);
    const progress = elem.querySelector(`.slider__progress`);
    let left = event.clientX - elem.getBoundingClientRect().left;
    let leftRelative = left / elem.offsetWidth;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    sliderValue.textContent = value;
    stepNode.forEach((step) => {
      step.className = ``;
    });
    stepNode[value].classList.add(`slider__step-active`);
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
    );
  }
}
