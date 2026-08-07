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
// function orderParameters() {
//   const root = document.querySelector(".plan__subscribe");
//   if (!root) return;

//   // Блок с заголовком и блоками пунктов аккордено
//   const items = root.querySelectorAll(".subscribe__accordion-item");
//   // Заголовок аккордеона
//   const triggers = root.querySelectorAll(".accordion__tiger");

//   // список слева
//   const listLeft = root.querySelectorAll("nav ul li");

//   // По умолчанию открываем первый элемент
//   items[0].classList.add("active");
//   triggers[0].setAttribute("aria-expanded", "true");

//   // И подсвечиваем соответствующий пункт меню
//   // например data-accordion-id="1"
//   const firstItemId = items[0].dataset.accordionId;
//   listLeft.forEach((li) => {
//     // сравниваем дата-атрибуты и добавляем класс
//     if (li.dataset.menuId === firstItemId) {
//       li.classList.add("pick");
//     }
//   });

//   items.forEach((item) => {
//     const trigger = item.querySelector(".accordion__tiger");
//     // получаем ID аккордеона
//     // атрибуту data-accordion-id="1" соответствует свойство accordionId
//     const accordionId = item.dataset.accordionId;
//     // console.log(accordionId);

//     trigger.addEventListener("click", () => {
//       const isActive = item.classList.contains("active");

//       if (isActive) {
//         // Закрываем аккордеон
//         item.classList.remove("active");
//         trigger.setAttribute("aria-expanded", "false");

//         // Убираем подсветку у соответствующего пункта меню
//         listLeft.forEach((listL) => {
//           if (listL.dataset.menuId === accordionId) {
//             listL.classList.remove("pick");
//           }
//         });
//       } else {
//         // Открываем аккордеон
//         item.classList.add("active");
//         trigger.setAttribute("aria-expanded", "true");

//         // Добавляем подсветку соответствующему пункту меню
//         listLeft.forEach((listL) => {
//           if (listL.dataset.menuId === accordionId) {
//             listL.classList.add("pick");
//           }
//         });
//       }
//     });
//   });

//   // Переключение карточек
//   const cardSelections = root.querySelectorAll(".accordion__panel-content");
//   // cardSelections.forEach((cardSelection) => {
//   //   cardSelection.addEventListener("click", () => {
//   //     cardSelections.forEach((cardS) => cardS.classList.remove("active"));
//   //     cardSelection.classList.add("active");
//   //   });
//   // });
//   cardSelections.forEach((cardSelection) => {
//     cardSelection.addEventListener("click", () => {
//       const parentAccordion = cardSelection.closest(
//         ".subscribe__accordion-item",
//       );
//       const accordionId = parentAccordion.dataset.accordionId;

//       // Находим карточки в этом аккордеоне по data-accordion-id
//       const cardsInThisAccordion = root.querySelectorAll(
//         `.accordion__panel-content[data-accordion-id="${accordionId}"]`,
//       );

//       cardsInThisAccordion.forEach((card) => {
//         card.classList.remove("active");
//       });
//       cardSelection.classList.add("active");

//       // Теперь можно получить ID выбранной карточки
//       console.log("Выбрана карточка:", cardSelection.dataset.cardId);
//     });
//   });
// }

function orderParameters() {
  const root = document.querySelector(".plan__subscribe");
  if (!root) return;

  const items = root.querySelectorAll(".subscribe__accordion-item");
  const triggers = root.querySelectorAll(".accordion__tiger");
  const listLeft = root.querySelectorAll("nav ul li");
  const cardSelections = root.querySelectorAll(".accordion__panel-content");
  const summaryText = document.querySelector(".summary__text");

  // Объект для хранения выбранных опций
  const selectedOptions = {};

  // По умолчанию открываем первый элемент
  items[0].classList.add("active");
  triggers[0].setAttribute("aria-expanded", "true");

  // Подсвечиваем соответствующий пункт меню
  const firstItemId = items[0].dataset.accordionId;
  listLeft.forEach((li) => {
    if (li.dataset.menuId === firstItemId) {
      li.classList.add("pick");
    }
  });

  // Обработчики для аккордеонов
  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__tiger");
    const accordionId = item.dataset.accordionId;

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      if (isActive) {
        item.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        listLeft.forEach((listL) => {
          if (listL.dataset.menuId === accordionId) {
            listL.classList.remove("pick");
          }
        });
      } else {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        listLeft.forEach((listL) => {
          if (listL.dataset.menuId === accordionId) {
            listL.classList.add("pick");
          }
        });
      }
    });
  });

  // Функция для обновления summary
  function updateOrderSummary() {
    // Массив с соответствием ID аккордеона и текста в summary
    const summaryParts = {
      '1': 'coffee',      // How do you drink your coffee?
      '2': 'bean',        // What type of coffee?
      '3': 'amount',      // How much would you like?
      '4': 'grind',       // Want us to grind them?
      '5': 'delivery'     // How often should we deliver?
    };

    let summary = "I drink my coffee using";
    
    // Собираем все выбранные опции
    if (selectedOptions['1']) {
      summary += ` ${selectedOptions['1']}, with a `;
    }
    if (selectedOptions['2']) {
      summary += `${selectedOptions['2']} type of bean. `;
    }
    if (selectedOptions['3']) {
      summary += `${selectedOptions['3']}, `;
    }
    if (selectedOptions['4']) {
      summary += `sent to me ${selectedOptions['4']}.`;
    }

    summaryText.textContent = summary;
  }

  // Переключение карточек с уникальными ID
  cardSelections.forEach((cardSelection) => {
    cardSelection.addEventListener("click", () => {
      // Находим родительский аккордеон
      const parentAccordion = cardSelection.closest(".subscribe__accordion-item");
      const accordionId = parentAccordion.dataset.accordionId;
      
      // Находим все карточки в этом аккордеоне
      const cardsInThisAccordion = parentAccordion.querySelectorAll(".accordion__panel-content");
      
      // Убираем класс active у всех карточек в этом аккордеоне
      cardsInThisAccordion.forEach((card) => {
        card.classList.remove("active");
      });
      
      // Добавляем класс active выбранной карточке
      cardSelection.classList.add("active");
      
      // Получаем текст кнопки выбранной карточки
      const buttonText = cardSelection.querySelector('.card-toggle-btn').textContent.trim();
      const cardId = cardSelection.dataset.cardId;
      
      // Сохраняем выбранную опцию
      selectedOptions[accordionId] = buttonText;
      
      // Обновляем summary
      updateOrderSummary();
      
      console.log(`Выбрана опция: "${buttonText}" (ID: ${cardId}) в ряду ${accordionId}`);
    });
  });

  // Если нужно сохранить выбор при загрузке (если есть активные карточки по умолчанию)
  cardSelections.forEach((card) => {
    if (card.classList.contains('active')) {
      const parentAccordion = card.closest(".subscribe__accordion-item");
      const accordionId = parentAccordion.dataset.accordionId;
      const buttonText = card.querySelector('.card-toggle-btn').textContent.trim();
      selectedOptions[accordionId] = buttonText;
    }
  });
  
  // Обновляем summary при загрузке
  updateOrderSummary();
}

orderParameters();

// orderParameters();
