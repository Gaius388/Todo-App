// import Sortable from "./node_modules/sortablejs";

const icons = document.querySelector(".icon__img");
const themeChange = document.querySelector(".container");
const input = document.querySelector(".input");
const todoList = document.querySelector(".todo__list");
const completed = document.querySelectorAll(".completed");
const clear = document.querySelectorAll(".clear");
const active = document.querySelectorAll(".active");
const all = document.querySelectorAll(".all");
const counter = document.querySelector(".counter");
const list = document.getElementById("list");

const renderTodo = (text) => {
  const html = `
        <div class="todo__addition">
            <div class="circle2"></div>
            <p class="todo__points">${text.value}</p>
            <p class="cancelX"></p>
        </div>
        `;
  todoList.insertAdjacentHTML("afterbegin", html);
};

icons.src = "./images/icon-moon.svg";

icons.addEventListener("click", () => {
  if (icons.src.match("./images/icon-moon.svg"))
    icons.src = "./images/icon-sun.svg";
  else {
    icons.src = "./images/icon-moon.svg";
  }
  themeChange.classList.toggle("theme__1");
  themeChange.classList.toggle("theme__2");
});

// To count how many items are left
const countTodo = () => {
  let add = [];
  const count2 = document.querySelectorAll(".circle2");
  count2.forEach((mov) => {
    if (mov.classList.value === "circle2") {
      add.push(mov);
    }
  });
  counter.innerHTML = `${add.length} items left`;
};

// Insert new todo to the list
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value !== "") {
    renderTodo(input);
    input.value = "";
    countTodo();
  }
});

todoList.addEventListener("click", function (e) {
  const btn = e.target.closest(".circle2");
  const cancel = e.target.closest(".cancelX");
  const todoText = e.target.closest(".todo__addition");

  // To toggle the check icon
  if (!btn && !cancel && !todoText) return;
  btn?.classList.toggle("check");

  // To handle the cross-out of checked todo's
  if (btn?.classList.contains("check")) {
    todoText.style.textDecoration = "line-through";
    todoText.style.color = "lightGray";
  }
  if (!btn?.classList.contains("check") && btn) {
    todoText.style.textDecoration = "none";
    todoText.style.color = "inherit";
  }

  // To remove the todo when the X is clicked
  if (cancel?.classList.contains("cancelX")) {
    const clear = e.target.closest(".todo__addition");
    clear.remove();
  }

  countTodo();
});

clear.forEach((mov) =>
  mov.addEventListener("click", function () {
    const circle = document.querySelectorAll(".circle2");

    circle?.forEach((mov) => {
      if (mov.classList.contains("check")) {
        const clear = mov.closest(".todo__addition");
        clear.remove();
      }
    });
  })
);

completed.forEach((mov) =>
  mov.addEventListener("click", function () {
    const circle = document.querySelectorAll(".circle2");

    circle?.forEach((mov) => {
      const clear = mov.closest(".todo__addition");
      clear.classList.remove("hidden");
      if (!mov.classList.contains("check")) {
        clear.classList.add("hidden");
      }
    });
  })
);

active.forEach((mov) =>
  mov.addEventListener("click", function () {
    const circle = document.querySelectorAll(".circle2");

    circle?.forEach((mov) => {
      const clear = mov.closest(".todo__addition");
      clear.classList.remove("hidden");
      if (mov.classList.contains("check")) {
        clear.classList.add("hidden");
      }
    });
  })
);

all.forEach((mov) =>
  mov.addEventListener("click", function () {
    const circle = document.querySelectorAll(".circle2");

    circle?.forEach((mov) => {
      const clear = mov.closest(".todo__addition");
      clear.classList.remove("hidden");
    });
  })
);


// Drag and Drop
let sortable = new Sortable(list, {
  animation: 100,
  draggable: ".todo__addition",
});
