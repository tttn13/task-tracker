import { NewOption, CategoriesList } from "./createOptions";

const NewToDo = (() => {
  const TODO_STORAGE_ID = "myToDosStorage";
  let all_todos = [];

  function ToDoObject(note, date, todoID, status, category) {
    const ToDo = {};
    ToDo.category = category;
    ToDo.note = note;
    ToDo.date = date;
    ToDo.id = todoID;
    ToDo.status = status;
    return ToDo;
  }

  const getNote = () => {
    return ToDo.note;
  };

  const getStatus = () => {
    return ToDo.status;
  };

  const getCategory = () => {
    return ToDo.category;
  };

  const getDate = () => {
    return ToDo.date;
  };

  const getTodos = () => {
    return all_todos;
  };

  const setCategory = (category) => {
    ToDo.category = category;
  };

  const create_div = (div_name, div_class, div_id = "") => {
    const div = document.createElement("div");
    div.setAttribute("name", div_name);
    div.className = div_class;
    div.id = div_id;
    return div;
  };

  const append_div_toMain = (div_name) => {
    const main = document.querySelector("#main");
    main.appendChild(div_name);
  };

  const create_inputButton = (button_type, button_name, button_value = "") => {
    const button = document.createElement("input");
    button.type = button_type;
    button.name = button_name;
    button.value = button_value;
    return button;
  };

  const input_container = () => {
    const input_container = create_div("input-container", "input");
    const input_label = document.createElement("label");
    input_label.for = "input-container";
    input_label.innerText = "\n\nTo Do\n";

    const inputText = create_inputButton("text", "todo-input");
    inputText.className = "text";
    inputText.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        document.querySelector('input[name="submit"]').click();
      }
    });
    const saveButton = create_inputButton("button", "submit", "SAVE");
    saveButton.addEventListener("click", updateToDoList);

    const inputDate = create_inputButton("date", "todo-date");
    inputDate.className = "date";

    input_container.appendChild(inputDate);
    input_container.appendChild(input_label);
    input_container.appendChild(inputText);
    input_container.appendChild(saveButton);
    append_div_toMain(input_container);
    return input_container;
  };

  const updateToDoList = () => {
    let input_text = document.querySelector('input[name="todo-input"]');
    let input_date = document.querySelector('input[name="todo-date"]').value;
    let converted_date = "";
    let todo_id = "base-" + new Date().getMilliseconds().toString();
    if (input_date == "") {
      converted_date = "Miscellaneous";
    } else {
      converted_date = new Date(input_date + "T00:00:00").toDateString();
    }

    if (input_text.value !== "") {
      const new_todo = new ToDoObject(
        input_text.value,
        converted_date,
        todo_id
      );
      all_todos.push(new_todo);
      persistToStorage();
      setUpViews(new_todo);
      input_text.value = "";
      input_text.focus();
    } else {
      console.log("Fill all fields");
    }
  };

  const setUpViews = (newToDo) => {
    const divWithSameDate = document.querySelector(`[name="${newToDo.date}"]`);
    if (!divWithSameDate) {
      const newDiv = createDivByDate(newToDo.date);
      newDiv.appendChild(create_element_container(newToDo.note, newToDo.id));
      append_div_toMain(newDiv);
    } else {
      divWithSameDate.appendChild(
        create_element_container(newToDo.note, newToDo.id)
      );
      append_div_toMain(divWithSameDate);
    }
  };

  const createDivByDate = (heading_text) => {
    const project_div = create_div(
      heading_text,
      "project-by-date",
      heading_text
    );
    const heading = document.createElement("h2");
    heading.textContent = heading_text;
    heading.className = "todo-heading";
    project_div.appendChild(heading);

    return project_div;
  };

  const deleteElement = (elementName) => {
    const elementsToRemove = document.getElementsByName(elementName);
    elementsToRemove.forEach((ele) => {
      const parent = ele.parentNode;
      const noteToRemove = ele.querySelector(".todo-text").innerText;

      const removedIndex = all_todos.findIndex(
        (item) => item.note === noteToRemove
      );
      all_todos.splice(removedIndex, 1);
      persistToStorage();

      if (parent.childElementCount == 2) {
        parent.removeChild(ele);
        parent.remove();
      } else {
        parent.removeChild(ele);
      }
    });
  };

  const editElement = (elementName) => {
    const textToEdit = document.getElementById(elementName);
    textToEdit.contentEditable = "true";
    textToEdit.style.border = "2px solid";
  };

  const create_element_container = (input_text, baseID) => {
    const todoIndex = all_todos.findIndex((item) => item.id === baseID);
    const element_container_name = "div" + baseID;
    const element_container = create_div(
      element_container_name,
      "li-container"
    );

    const todo_p = document.createElement("p");
    todo_p.textContent = input_text;

    todo_p.setAttribute("type", "text");
    todo_p.className = "todo-text";
    todo_p.id = "p" + element_container_name;
    todo_p.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        all_todos[todoIndex].note = todo_p.innerText;
        persistToStorage();
        todo_p.contentEditable = false;
        todo_p.style.border = "none";
      }
    });

    const checkBox = create_inputButton("checkbox", "status");
    checkBox.checked = all_todos[todoIndex].status;
    if (checkBox.checked) {
      element_container.style.border = "dotted";
    }

    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        all_todos[todoIndex].status = checkBox.checked;
        element_container.style.border = "dotted";
      } else {
        all_todos[todoIndex].status = checkBox.checked;
        element_container.style.border = "none";
        element_container.style.borderBottom = "1px solid";
      }
      persistToStorage();
    });
    element_container.appendChild(checkBox);
    element_container.appendChild(todo_p);
    create_buttons_container(
      element_container,
      element_container_name,
      todo_p.id
    );

    return element_container;
  };

  const create_buttons_container = (
    element_container,
    element_container_name,
    element_container_id
  ) => {
    const buttons_dropdown = create_div("dropdown", "dropdown");

    const buttons_container_id = "dd-" + element_container_name;
    const buttons_container = create_div(
      "buttons-container",
      "buttons-container",
      buttons_container_id
    );

    const dropdownBtn_id = "db-" + element_container_name;
    const dropdownBtn = create_icon_container(
      "dropButton",
      "fas fa-bars",
      element_container_name,
      dropdownBtn_id
    );
    dropdownBtn.addEventListener("click", (event) => {
      show_dropDowns(buttons_container_id);
      event.stopPropagation();
    });

    window.addEventListener("click", close_dropDowns);

    const delete_icon = create_icon_container(
      "delete-todo",
      "fas fa-trash",
      element_container_name
    );
    delete_icon.addEventListener("click", () => {
      deleteElement(element_container_name);
    });

    const edit_icon = create_icon_container(
      "edit-todo",
      "fas fa-pen",
      element_container_name
    );
    edit_icon.addEventListener("click", () => {
      editElement(element_container_id);
    });

    const plus_icon = create_icon_container(
      "add-cat",
      "fas fa-user-plus",
      element_container_name
    );

    //create pop up box
    const modalBox_id = "modalbox-" + element_container_name;
    const modalBox = create_div("modalBox", "modalBox", modalBox_id);
    const modalBoxContent = createPopUp(
      modalBox_id,
      element_container_name,
      modalBox
    );

    const modalBox_body = modalBoxContent.querySelector(
      "#" + "body-" + modalBox_id
    );

    plus_icon.addEventListener("click", () => {
      modalBox_body.innerHTML = "";
      modalBox.style.display = "flex";
      const newBody = CategoriesList.addCheckBoxToCategory(
        modalBox_id,
        modalBox_body
      );
      modalBoxContent.appendChild(newBody);
    });

    buttons_container.appendChild(delete_icon);
    buttons_container.appendChild(edit_icon);
    buttons_container.appendChild(plus_icon);

    buttons_dropdown.appendChild(dropdownBtn);
    buttons_dropdown.appendChild(buttons_container);
    element_container.appendChild(buttons_dropdown);

    modalBox.appendChild(modalBoxContent);
    element_container.appendChild(modalBox);
  };

  const createPopUp = (modalBox_id, element_container_name, modalBox) => {
    const modalBoxContent = create_div("modalBoxContent", "modalBoxContent");
    const closeIcon_id = "close-icon-" + modalBox_id;
    const closeIcon = create_icon_container(
      "close-icon",
      "fas fa-times",
      element_container_name,
      closeIcon_id
    );
    closeIcon.addEventListener("click", () => {
      modalBox.style.display = "none";
    });

    const modalBoxHeader = document.createElement("h2");
    modalBoxHeader.innerText = "Please choose a category";

    const modalBox_body_id = "body-" + modalBox_id;
    const modalBox_body = create_div(
      "popUpBox-body",
      "popUpBox-body",
      modalBox_body_id
    );

    modalBoxContent.appendChild(closeIcon);
    modalBoxContent.appendChild(modalBoxHeader);
    modalBoxContent.appendChild(modalBox_body);
    return modalBoxContent;
  };

  const show_dropDowns = (dropDownDivId) => {
    const toggleClass = (el, className) => el.classList.toggle(className);
    toggleClass(document.getElementById(dropDownDivId), "show");
  };

  const close_dropDowns = () => {
    const dropdowns = document.getElementsByClassName("buttons-container");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropDown = dropdowns[i];
      if (openDropDown.classList.contains("show")) {
        openDropDown.classList.remove("show");
      }
    }
  };

  const create_icon_container = (
    iconContainer_class,
    icon_class,
    iconContainer_name,
    iconContainer_id = ""
  ) => {
    const icon_container = document.createElement("button");
    icon_container.name = iconContainer_name;
    icon_container.setAttribute("class", iconContainer_class);
    icon_container.id = iconContainer_id;
    const icon = document.createElement("i");
    icon.className = icon_class;
    icon_container.appendChild(icon);
    return icon_container;
  };

  const persistToStorage = () => {
    localStorage.setItem(TODO_STORAGE_ID, JSON.stringify(all_todos));
  };

  const loadFromStorage = () => {
    const myToDoFromStorage = JSON.parse(localStorage.getItem(TODO_STORAGE_ID));
    if (myToDoFromStorage !== null) {
      all_todos = myToDoFromStorage;
      console.log(all_todos);
    } else {
      all_todos = [];
    }
    all_todos.forEach(setUpViews);
  };

  return {
    ToDoObject,
    create_div,
    append_div_toMain,
    create_element_container,
    input_container,
    updateToDoList,
    createDivByDate,
    create_icon_container,
    close_dropDowns,
    createPopUp,
    create_inputButton,
    all_todos,
    loadFromStorage,
    getTodos,
    getDate,
    getNote,
    getDate,
    getStatus,
    getCategory,
    setCategory,
    persistToStorage,
  };
})();

export default NewToDo;
