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
const myInput1 = document.getElementById("my-input1");
const myInput2 = document.getElementById("my-input2");

function stepper(btn) {
  let id = btn.getAttribute("id");
  let min = myInput1.getAttribute("min");
  let max = myInput1.getAttribute("max");
  let step = myInput1.getAttribute("step");
  let val = myInput1.getAttribute("value");
  let calcStep = (id === "increment") ? (step * 1) : (step * -1);
  let newValue = parseInt(val) + calcStep;
  
  if (newValue >= min && newValue <= max) {
    myInput1.setAttribute("value", newValue);
    myInput2.setAttribute("value", newValue); // Copy value to my-input2
  }

  console.log(id, calcStep);
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



// Function to toggle content based on button click
function toggleContent(contentId) {
  // Hide all content divs
  var contentDivs = document.getElementsByClassName("mobile_content");
  for (var i = 0; i < contentDivs.length; i++) {
      contentDivs[i].style.display = "none";
  }
  
  // Show the selected content div
  var selectedContent = document.getElementById("mobile_content" + contentId);
  selectedContent.style.display = "block";
  
  // Set active class to the clicked button
  var mobile_buttons = document.getElementsByClassName("mobile_button");
  for (var i = 0; i < mobile_buttons.length; i++) {
    mobile_buttons[i].classList.remove("active");
  }
  var mobile_selectedButton = document.getElementsByClassName("mobile_button")[contentId - 1];
  mobile_selectedButton.classList.add("active");
}


