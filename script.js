// Turn on/off AC 
const toggleACButton = document.getElementById("toggleACButton");
const toggleACLabel = document.querySelector(".toggle-AC-button");

toggleACButton.addEventListener("change", function() {
  if (toggleACButton.checked) {
    toggleACLabel.classList.add("on");
  } else {
    toggleACLabel.classList.remove("on");
  }
});

// AC Temperature limits display
const myInput = document.getElementById("my-input")
function stepper(btn) {
  let id = btn.getAttribute("id");
  let min = myInput.getAttribute("min");
  let max = myInput.getAttribute("max");
  let step = myInput.getAttribute("step");
  let val = myInput.getAttribute("value");
  let calcStep = (id == "increment") ? (step * 1) : (step * -1);
  let newValue = parseInt(val) + calcStep;
  if (newValue >= min && newValue <= max) {
    myInput.setAttribute("value", newValue);
  }

  console.log(id, calcStep)

}



// Type of AC 
const fanTypeButtons = document.getElementsByClassName('type_of_fan_link');

Array.from(fanTypeButtons).forEach(button => {
  button.addEventListener('click', function() {
    Array.from(fanTypeButtons).forEach(otherButton => {
      if (otherButton !== this) {
        otherButton.classList.remove('type_of_fan_active');
      }
    });

    this.classList.toggle('type_of_fan_active');
  });
});


// Dropdown list function
const initializeDropdown = (dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach(opt => {
        opt.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
};

// Initialize dropdowns
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(initializeDropdown);

// New todo
const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (cevatodo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${cevatodo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

addForm.addEventListener("submit", e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  };
});

list.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  };
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
