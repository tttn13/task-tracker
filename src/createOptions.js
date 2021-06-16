import NewToDo from "./createNewTodo";

const NewOption = (() => {
  const side_bar = document.getElementById("side-bar");

  const create_allProjectsContainers = () => {
    const allProjectsContainers = document.createElement("div");
    allProjectsContainers.id = "all-projects";
    allProjectsContainers.style.display = "none";
    document.querySelector("body").appendChild(allProjectsContainers);
  };

  const create_form_layout = () => {
    const ProjectsButton = document.createElement("button");
    ProjectsButton.setAttribute("id", "projects-btn");
    ProjectsButton.textContent = "Projects";

    const menu_form = document.createElement("form");
    menu_form.style.display = "block";
    const form_label = document.createElement("label");
    form_label.innerText = "Project\n";

    const input_form = document.createElement("input");
    input_form.type = "text";
    input_form.id = "category-input";
    input_form.placeholder = "Enter a project";

    const addBtn = document.createElement("button");
    addBtn.textContent = "ADD";
    addBtn.id = "add-button";
    addBtn.addEventListener("click", create_new_option);

    const categories_label = document.createElement("label");
    categories_label.for = "list";
    categories_label.innerText = "\n\nAll\n";

    const options_listBox = document.createElement("select");
    options_listBox.id = "list";
    // options_listBox.multiple = true;

    const removeBtn = document.createElement("button");
    removeBtn.id = "remove-button";
    removeBtn.textContent = "REMOVE";
    removeBtn.addEventListener("click", remove_selected_options);

    const categories_list = document.createElement("ul");
    categories_list.id = "categories-list";
    categories_list.style.display = "block";

    const homeBtn = document.createElement("button");
    homeBtn.setAttribute("id", "home-btn");
    homeBtn.textContent = "Home Page";
    homeBtn.addEventListener("click", () => {
      document.getElementById("main").style.display = "block";
      // NewToDo.clearContent()
      // NewToDo.generateViews()
      hidePresentDiv("");
    });

    ProjectsButton.addEventListener("click", () => {
      if (menu_form.style.display && categories_list.style.display != "none") {
        menu_form.style.display = "none";
        categories_list.style.display = "none";
      } else {
        menu_form.style.display = "block";
        categories_list.style.display = "block";
      }
    });

    side_bar.appendChild(homeBtn);
    side_bar.appendChild(ProjectsButton);
    menu_form.appendChild(form_label);
    menu_form.appendChild(input_form);
    menu_form.appendChild(addBtn);
    menu_form.appendChild(categories_label);
    menu_form.appendChild(options_listBox);
    menu_form.appendChild(removeBtn);

    side_bar.appendChild(menu_form);
    side_bar.appendChild(categories_list);
  };

  const create_new_option = (event) => {
    const entered_category = document.querySelector("#category-input");
    const options_box = document.querySelector("#list").options;
    const categories_menu = document.querySelector("#categories-list");
    // validate the option
    if (entered_category.value == "" || !isNaN(entered_category.value)) {
      alert("Please enter the name.");
      return;
    }
    // create a new option
    const new_option = new Option(
      entered_category.value,
      entered_category.value
    );

    // add it to the box
    options_box.add(new_option);

    // reset the value of the input
    entered_category.value = "";
    entered_category.focus();
    event.preventDefault();

    //add to categories menu below
    addToCategoriesList(categories_menu, new_option.value);

    //add to the array
    CategoriesList.insert_category(new_option.value);
  };

  const remove_selected_options = (event) => {
    const options_box = document.querySelector("#list");
    const categories_menu = document.querySelector("#categories-list");

    //remove from the box
    const removed_index = options_box.selectedIndex;
    options_box.remove(removed_index);
    event.preventDefault();
    // remove from categories menu
    categories_menu.removeChild(categories_menu.childNodes[removed_index]);
    //remove from array
    CategoriesList.remove_category(removed_index);
  };

  const addToCategoriesList = (main_list, addedCategory) => {
    const projectContainer = document.createElement("li");
    projectContainer.innerText = addedCategory;
    projectContainer.className = "added-category";
    projectContainer.id = addedCategory;
    const categoryDivId = addedCategory + "-populate";
    createProjectContainer(addedCategory, categoryDivId);
    projectContainer.addEventListener("click", () => {
      document.getElementById("all-projects").style.display = "block";
      const main = document.getElementById("main");
      main.style.display = "none";
      clearProjectContent(categoryDivId);
      setUpProjectView(addedCategory, categoryDivId);
      hidePresentDiv(categoryDivId);
    });
    main_list.appendChild(projectContainer);
  };

  const hidePresentDiv = (categoryDivId) => {
    const allPresentDivs = document.querySelectorAll(".category-div");
    allPresentDivs.forEach((div) => {
      if (div.id != categoryDivId) {
        div.style.display = "none";
      } else {
        div.style.display = "block";
      }
    });
  };

  const createProjectContainer = (addedCategory, categoryDivId) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "category-div";
    projectDiv.id = categoryDivId;
    const heading = document.createElement("h2");
    heading.textContent = addedCategory;
    projectDiv.appendChild(heading);
    document.getElementById("all-projects").appendChild(projectDiv);
    return projectDiv;
  };

  const clearProjectContent = (categoryDivId) => {
    const content = document.getElementById(categoryDivId);
    console.log(content);
    content.innerHTML = "";
  };

  const setUpProjectView = (addedCategory, categoryDivId) => {
    const content = document.getElementById(categoryDivId);
    const heading = document.createElement("h2");
    heading.textContent = addedCategory;
    content.appendChild(heading);
    NewToDo.getTodos()
      .filter((item) => item.category == addedCategory)
      .forEach((item) => {
        const itemID = categoryDivId + item.id;
        const todoDivContent = NewToDo.setUpViews(item, itemID);
        const todoDate = document.createElement("sup");
        todoDate.innerText = item.date;
        todoDivContent.appendChild(todoDate);
        content.appendChild(todoDivContent);
      });
  };

  return {
    create_form_layout,
    remove_selected_options,
    side_bar,
    create_new_option,
    addToCategoriesList,
    create_allProjectsContainers,
  };
})();

const CategoriesList = (() => {
  let categoriesList = [];
  const insert_category = (category) => {
    categoriesList.push(category);
    localStorage.setItem(
      "CategoriesArrayStorage",
      JSON.stringify(categoriesList)
    );
  };

  const remove_category = (categoryIndex) => {
    categoriesList.splice(categoryIndex, 1);
    localStorage.setItem(
      "CategoriesArrayStorage",
      JSON.stringify(categoriesList)
    );
  };

  const addCheckBoxToCategory = (modalBox_id, parent_div) => {
    categoriesList.forEach((category) => {
      const cat_element_id = category + "-" + modalBox_id;
      const cat_element = NewToDo.create_div(
        category,
        "listed-category",
        cat_element_id
      );
      const checkBox = NewToDo.create_inputButton(
        "checkbox",
        `checkbox-${category}`
      );
      const checkBoxId = "radio-" + cat_element_id;
      checkBox.setAttribute("id", checkBoxId);
      const cat_element_p = document.createElement("p");
      cat_element_p.innerText = category;
      cat_element.appendChild(checkBox);
      cat_element.appendChild(cat_element_p);
      parent_div.appendChild(cat_element);

      checkBox.addEventListener("change", () => {
        updateItemCategory(modalBox_id, checkBox, cat_element_p);
      });
      ifCheckBoxIsChecked(checkBox, cat_element_p.innerText, modalBox_id);
    });
    return parent_div;
  };

  const ifCheckBoxIsChecked = (checkBox, checkBoxText, modalBox_id) => {
    NewToDo.getTodos()
      .filter((item) => modalBox_id.includes(item.id))
      .forEach((item) => {
        checkBox.checked = item.category == checkBoxText;
      });
  };

  const updateItemCategory = (modalBox_id, checkBox, cat_element_p) => {
    NewToDo.getTodos()
      .filter((item) => modalBox_id.includes(item.id))
      .forEach((item) => {
        checkBox.checked
          ? (item.category = cat_element_p.innerText)
          : (item.category = "");
      });

    NewToDo.persistToStorage();
  };

  const populateToDos = (addedCategory, projectContainer) => {
    projectContainer.innerHTML = "";
    NewToDo.getTodos()
      .filter((item) => item.category == addedCategory)
      .forEach((item) => {
        const todo_date = document.createElement("p");
        todo_date.className = "todo-project-date";
        todo_date.innerText = item.date;
        projectContainer.appendChild(todo_date);
        const itemsContainer = filterElementsContainer(item.id);
        itemsContainer.forEach((item) => {
          projectContainer.appendChild(item);
        });
      });
  };

  const populateViews = () => {
    const options_box = document.querySelector("#list");
    const categories_menu = document.querySelector("#categories-list");
    categoriesList.forEach((category) => {
      const addedOption = new Option(category, category);
      options_box.options.add(addedOption);
      NewOption.addToCategoriesList(categories_menu, category);
    });
  };

  const loadFromStorage = () => {
    let categoriesArrayFromStorage = JSON.parse(
      localStorage.getItem("CategoriesArrayStorage")
    );
    if (categoriesArrayFromStorage !== null) {
      categoriesList = categoriesArrayFromStorage;
    } else {
      categoriesList = [];
    }
  };

  return {
    insert_category,
    addCheckBoxToCategory,
    remove_category,
    populateToDos,
    categoriesList,
    loadFromStorage,
    populateViews,
    ifCheckBoxIsChecked,
  };
})();

export { NewOption, CategoriesList };
