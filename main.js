const words = [
  "БАРАН",
  "ДОМЕН",
  "ДВЕРЬ",
  "РУЧКА",
  "ШКОЛА",
  "ЛАМПА",
  "ЧАШКА",
  "ЛОЖКА",
  "ВОРОТ",
  "ВЕДРО",
  "БИРЖА",
  "БАРЖА",
  "УСПЕХ",
  "АФИША",
  "УСПЕХ",
  "ПОВАР",
  "БУКВА",
  "ЕГЕРЬ",
  "ТЫКВА",
];
let allLettersGuessed;
let wordNow;

function randomWord() {
  const index = Math.floor(Math.random() * words.length);
  console.log(index);
  wordNow = words[index];
  console.log(wordNow);
}
randomWord();

const keys = document.querySelectorAll(".keyboard-cell");

let statusBtn = document.getElementById("check-btn");

let cells = document.querySelectorAll(".cell");

const rows = document.querySelectorAll(".row");

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function () {
    if (statusBtn.disabled) {
      const keyNow = this.innerText;
      for (let j = 0; j < cells.length; j++) {
        if (cells[j].innerHTML === "") {
          cells[j].innerHTML = keyNow;

          break;
        }
      }
    }

    console.log(isRowFilled());
    if (isRowFilled()) {
      statusBtn.disabled = false;
    } else {
      statusBtn.disabled = true;
    }
  });
}

const deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", function () {
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].innerHTML !== "") {
      cells[i].innerHTML = "";

      break;
    }
  }
  console.log(isRowFilled());
  if (isRowFilled()) {
    statusBtn.disabled = false;
  } else {
    statusBtn.disabled = true;
  }
});

let rowChildCell = 2;
function isRowFilled() {
  const rowCells = document.querySelectorAll(
    `.row:nth-child(${rowChildCell}) .cell`
  );
  for (let i = 0; i < rowCells.length; i++) {
    if (rowCells[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

const checkBtn = document.getElementById("check-btn");

checkBtn.addEventListener("click", function () {
  if (!checkBtn.disabled) {
    function getFirstRowValues() {
      // Разбить слово на отдельные буквы
      const wordArray = wordNow.split("");

      // Получить значения ячеек первой строки
      const firstRowCells = document.querySelectorAll(
        `.row:nth-child(${rowChildCell}) .cell`
      );
      const firstRowValues = Array.from(
        firstRowCells,
        (cell) => cell.innerText
      );
      console.log(firstRowValues);

      // Перебирать значения ячеек первой строки и сравнивать с буквами слова
      firstRowValues.forEach((value, index) => {
        const matchingCell = document.querySelector(
          `.row:nth-child(${rowChildCell}) .cell:nth-child(${index + 1})`
        );

        if (wordArray.includes(value)) {
          if (wordArray[index] === value) {
            // Если буква есть в обоих массивах и имеет одинаковый индекс, то красим ячейку в зеленый цвет
            matchingCell.style.backgroundColor = "green";
          } else {
            // Если буква есть в обоих массивах и имеет разный индекс, то красим ячейку в желтый цвет
            matchingCell.style.backgroundColor = "yellow";
          }
        } else {
          // Если буквы нет в слове, то красим ячейку в серый цвет
          matchingCell.style.backgroundColor = "red";
        }
      });

      // Вывести массив букв слова в консоль
      console.log(wordArray);

      // Вывести массив значений ячеек в консоль
      const rowCells = document.querySelectorAll(
        `.row:nth-child(${rowChildCell}) .cell`
      );
      const rowValues = Array.from(rowCells, (cell) => cell.innerText);
      console.log(rowValues);
      allLettersGuessed = rowValues.every((letter, index) => {
        return letter === wordArray[index];
      });
      console.log("test", allLettersGuessed);
      if (allLettersGuessed) {
        // Если все буквы угаданы, то выводим сообщение о победе и делаем кнопку "Проверить" неактивной
        alert("Ты победил!");
        checkBtn.disabled = true;
      } else {
        // Если не все буквы угаданы, то переходим на следующую строку и делаем кнопку "Проверить" активной
        rowChildCell++;
        checkBtn.disabled = true;
      }
    }

    getFirstRowValues();
    console.log("Кнопка нажата!");

    // Изменить прозрачность ячеек в строках с 2 по 6
    const cellsToChangeOpacity = document.querySelectorAll(
      ".row:nth-child(n+2):nth-child(-n+6) .cell"
    );
    cellsToChangeOpacity.forEach((cell) => {
      cell.style.opacity = "0.5";
    });

    // Изменить прозрачность ячеек в строке rowChildCell
    const cells = document.querySelectorAll(
      `.row:nth-child(${rowChildCell}) .cell`
    );
    cells.forEach((cell) => {
      cell.style.opacity = "1";
    });

    console.log(rowChildCell);

    const allCells = document.querySelectorAll(".cell:not(.title)");

    // Проверяем, заполнены ли все ячейки всех строк, и слово не угадано
    const allCellsFilled = Array.from(allCells).every(
      (cell) => cell.innerText !== ""
    );
    console.log("test", allLettersGuessed);
    // Если все ячейки заполнены, то выводим сообщение о проигрыше и делаем кнопку "Проверить" неактивной
    if (allCellsFilled && !allLettersGuessed) {
      alert(`Ты проиграл! Загаданое слово - ${wordNow}`);
      checkBtn.disabled = true;
    }
  }
});
