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
function orderParameters() {
  const root = document.querySelector(".plan__subscribe");
  if (!root) return;

  // Блок с заголовком и блоками пунктов аккорденом
  const items = root.querySelectorAll(".subscribe__accordion-item");
  // Заголовок аккордеона
  const triggers = root.querySelectorAll(".accordion__tiger");
  // список слева
  const listLeft = root.querySelectorAll("nav ul li");
  // Переключение карточек
  const cardSelections = root.querySelectorAll(".accordion__panel-content");
  // Итоговый текст после оформления заказа
  const summaryText = document.querySelector(".summary__text");
  // кнопка внизу когда не заполнена - она не актвирована
  const createPlanBtn = root.querySelector(".plan__link");
  // console.log(createPlanBtn);
  // let createPlanBtn.disabled = 'false';

  // Объект для хранения выбранных опций
  const selectedOptions = {};

  // По умолчанию открываем первый элемент
  items[0].classList.add("active");
  triggers[0].setAttribute("aria-expanded", "true");

  // Подсвечиваем соответствующий пункт меню слева
  // например data-accordion-id="1"
  const firstItemId = items[0].dataset.accordionId;
  listLeft.forEach((li) => {
    if (li.dataset.menuId === firstItemId) {
      li.classList.add("pick");
    }
  });

  // Обработчики для аккордеонов
  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__tiger");
    // получаем ID аккордеона
    // атрибуту data-accordion-id="1" соответствует свойство accordionId
    const accordionId = item.dataset.accordionId;

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      if (isActive) {
        // Закрываем аккордеон
        item.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        // Убираем подсветку у соответствующего пункта меню
        listLeft.forEach((listL) => {
          if (listL.dataset.menuId === accordionId) {
            listL.classList.remove("pick");
          }
        });
      } else {
        // Открываем аккордеон
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        // Добавляем подсветку соответствующему пункту меню
        listLeft.forEach((listL) => {
          if (listL.dataset.menuId === accordionId) {
            listL.classList.add("pick");
          }
        });
      }
    });
  });

  // Функция обновления summary с цветом #0E8784
  // function updateOrderSummary() {
  //   let htmlContent = "I drink my coffee as ";

  //   // Ряд 1: with a _____ type of bean.
  //   if (selectedOptions["1"]) {
  //     htmlContent += `<span style="color: #0E8784; font-weight: 700;">${selectedOptions["1"]}</span>, with a `;
  //   }

  //   // Ряд 2: _____ ground
  //   if (selectedOptions["2"]) {
  //     htmlContent += `<span style="color: #0E8784; font-weight: 700;">${selectedOptions["2"]}</span>   type of bean. `;
  //   }

  //   // Ряд 3: ala _____,
  //   if (selectedOptions["3"]) {
  //     htmlContent += `<span style="color: #0E8784; font-weight: 700;">${selectedOptions["3"]}</span> ground ala `;
  //   }

  //   // Ряд 4: sent to me _____.
  //   if (selectedOptions["4"]) {
  //     htmlContent += `<span style="color: #0E8784; font-weight: 700;">${selectedOptions["4"]}</span>, `;
  //   }
  //   // Ряд 5: sent to me _____.
  //   if (selectedOptions["5"]) {
  //     htmlContent += `sent to me <span style="color: #0E8784; font-weight: 700;">${selectedOptions["5"]}</span>."`;
  //   }

  //   summaryText.innerHTML = htmlContent;

  //   const createPlanBtn = root.querySelector(".plan__link");
  //   createPlanBtn.classList.remove("disabled");
  // }
  // Функция обновления summary
  function updateOrderSummary() {
    let htmlContent = "I drink my coffee as ";

    // Ряд 1: Preferences
    if (selectedOptions["1"]) {
      htmlContent += `<span style="color: #0E8784; font-weight: 700;">${selectedOptions["1"]}</span>, with a `;
    } else {
      htmlContent += "_____ , with a ";
    }

    // Ряд 2: Bean Type
    if (selectedOptions["2"]) {
      htmlContent += `<span style="color: #0E8784; font-weight: 700;">${selectedOptions["2"]}</span> type of bean. `;
    } else {
      htmlContent += "_____ type of bean. ";
    }

    // Определяем, выбран ли вариант Capsule на 1-м шаге
    const isCapsule = selectedOptions["1"] === "Capsule";
    // Находим 4-й аккордеон (Гринд/Помол), в верстке это элемент с dataset.accordionId="4"
    const grindAccordion = root.querySelector('[data-accordion-id="4"]');

    if (isCapsule) {
      // Если капсулы: убираем выбор из 4 шага, так как он не нужен
      delete selectedOptions["4"];
      if (grindAccordion) {
        grindAccordion.classList.add("disabled-accordion"); // класс для скрытия/затемнения в CSS
        grindAccordion.classList.remove("active");
      }
    } else {
      if (grindAccordion) {
        grindAccordion.classList.remove("disabled-accordion");
      }

      // Ряд 4: Grind Option (рендерится ТОЛЬКО если это НЕ капсулы)
      if (selectedOptions["4"]) {
        htmlContent += `ground ala <span style="color: #0E8784; font-weight: 700;">${selectedOptions["4"]}</span>, `;
      } else {
        htmlContent += "ground ala _____, ";
      }
    }

    // Ряд 3: Quantity
    if (selectedOptions["3"]) {
      htmlContent += `sent to me <span style="color: #0E8784; font-weight: 700;">${selectedOptions["3"]}</span>, `;
    } else {
      htmlContent += "sent to me _____, ";
    }

    // Ряд 5: Deliver Plan
    if (selectedOptions["5"]) {
      htmlContent += `every <span style="color: #0E8784; font-weight: 700;">${selectedOptions["5"]}</span>."`;
    } else {
      htmlContent += 'every _____."';
    }

    summaryText.innerHTML = htmlContent;

    // ДИНАМИЧЕСКАЯ ПРОВЕРКА КНОПКИ:
    // Если капсулы — нужно 4 заполненных шага. Если нет — все 5.
    const requiredStepsCount = isCapsule ? 4 : 5;
    const createPlanBtn = root.querySelector(".plan__link");

    if (Object.keys(selectedOptions).length === requiredStepsCount) {
      createPlanBtn.classList.remove("disabled");
    } else {
      createPlanBtn.classList.add("disabled");
    }
  }

  // Переключение карточек
  cardSelections.forEach((cardSelection) => {
    cardSelection.addEventListener("click", () => {
      // Находим родительский аккордеон
      const parentAccordion = cardSelection.closest(
        ".subscribe__accordion-item",
      );
      const accordionId = parentAccordion.dataset.accordionId;
      // Находим карточки в этом аккордеоне по data-accordion-id
      const cardsInThisAccordion = parentAccordion.querySelectorAll(
        ".accordion__panel-content",
      );
      // Убираем класс active у всех карточек в этом аккордеоне
      cardsInThisAccordion.forEach((card) => {
        card.classList.remove("active");
      });
      // Добавляем класс active выбранной карточке
      cardSelection.classList.add("active");
      // Получаем текст кнопки выбранной карточки
      const buttonText = cardSelection
        .querySelector(".card-toggle-btn")
        .textContent.trim();
      selectedOptions[accordionId] = buttonText;
      // Обновляем summary при загрузке
      updateOrderSummary();
    });
  });

  // Инициализация summary при загрузке
  updateOrderSummary();
}

orderParameters();

// orderParameters();
