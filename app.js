const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu__button");
const open = document.querySelector(".open__button");
const close = document.querySelector(".close__button");
// console.log(body, buttons, open, close);

function menuToggle() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = body.classList.toggle("menu__active");
      if (isActive) {
        open.setAttribute("aria-expanded", "true");
        close.setAttribute("aria-expanded", "false");
      } else {
        close.setAttribute("aria-expanded", "true");
        open.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function escapeMenu() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu__active")) {
      body.classList.remove("menu__active");
      open.setAttribute("aria-expanded", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  menuToggle();
  escapeMenu();
});

// Расскрытие аккордеона
// Нужно сделать так, чтобы открывались все пункты аккордеона
function orderParameters() {
  const root = document.querySelector(".plan__subscribe-accordion");
  if (!root) return;

  const items = root.querySelectorAll(".subscribe__accordion-item");
  const triggers = root.querySelectorAll(".accordion__tiger");

  items[0].classList.add("active");
  triggers[0].setAttribute("aria-expanded", "true");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__tiger");

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // для закрытия аккордеонов
      items.forEach((itm) => {
        itm.classList.remove("active");
        itm.querySelector(".accordion__tiger");
        itm.setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
      } else {
      }
    });
  });

  // переключение карточек
  const cardSelections = root.querySelectorAll('.accordion__panel-content');
  // console.log(cardSelections);
  cardSelections.forEach((cardSelection, index) => {
    cardSelection.addEventListener('click', () => {
      cardSelections.forEach((cardS) => cardS.classList.remove('active'));
      cardSelection.classList.add('active');
    })
  })
  
}

orderParameters();

