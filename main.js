/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createNewTodo.js":
/*!******************************!*\
  !*** ./src/createNewTodo.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _createOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createOptions */ \"./src/createOptions.js\");\n\n\nconst NewToDo = (() => {\n    const TODO_STORAGE_ID = \"myToDosStorage\"\n    let all_todos = [];\n\n    function ToDoObject(note,date,todoID,status,category)  {\n        const ToDo = {};\n        ToDo.category = category;\n        ToDo.note = note;\n        ToDo.date = date;\n        ToDo.id = todoID;\n        ToDo.status = status;\n        return ToDo;\n\n\n    }\n           \n    const getNote = () => {\n        return ToDo.note;\n    }\n\n    const getStatus = () => {\n        return ToDo.status;\n    }\n\n    const getCategory = () => {\n        return ToDo.category;\n    }\n\n    const getDate = () => {\n        return ToDo.date;\n    }\n\n    const getTodos = () => {\n        return all_todos;\n    }\n\n    const setCategory = (category) => {\n        ToDo.category = category;\n    }\n\n    const create_div = (div_name, div_class, div_id=\"\") => {\n        const div = document.createElement('div');\n        div.setAttribute(\"name\",div_name);\n        div.className = div_class;\n        div.id = div_id;\n        return div;\n    }\n    \n    const append_div_toMain = (div_name) => {\n        const main = document.querySelector('#main');\n        main.appendChild(div_name);\n    };\n\n    // const handle_keypress = (char, textBox) => {\n    //     if (char === \"Enter\") {\n    //         setNote(textBox.innerText);\n    //         textBox.contentEditable = false;\n    //         textBox.style.border = \"none\";\n    //         console.log(ToDoObject.note)\n    //     };\n    // } \n\n    const create_inputButton = (button_type, button_name, button_value = \"\") => {\n        const button = document.createElement('input');\n        button.type = button_type;\n        button.name = button_name;\n        button.value = button_value;\n        return button;\n    }\n\n    const input_container = () => {\n        const input_container = create_div(\"input-container\", \"input\");\n        const input_label = document.createElement('label');\n        input_label.for = \"input-container\";\n        input_label.innerText = \"\\n\\nTo Do\\n\";\n    \n        const inputText = create_inputButton('text','todo-input');        \n        inputText.className = \"text\";\n        inputText.addEventListener('keypress', (event) => {\n            if (event.key === \"Enter\") {\n                document.querySelector('input[name=\"submit\"]').click()\n            }\n        })\n        const saveButton = create_inputButton('button','submit',\"SAVE\");\n        saveButton.addEventListener('click',updateToDoList)\n       \n        const inputDate = create_inputButton(\"date\", \"todo-date\");\n        inputDate.className = \"date\";\n      \n        input_container.appendChild(inputDate);\n        input_container.appendChild(input_label);\n        input_container.appendChild(inputText);\n        input_container.appendChild(saveButton);\n        append_div_toMain(input_container);\n        return input_container\n    }\n\n    const updateToDoList  = () => {\n        let input_text = document.querySelector('input[name=\"todo-input\"]');\n        let input_date = document.querySelector('input[name=\"todo-date\"]').value;\n        let converted_date = \"\";\n        let todo_id = \"base-\" + (new Date().getMilliseconds()).toString();\n        if (input_date == \"\") {\n            converted_date = \"Miscellaneous\";\n        } else {\n            converted_date = new Date(input_date+\"T00:00:00\").toDateString();\n        }\n\n        if (input_text.value !== \"\") {\n            const new_todo = new ToDoObject(input_text.value,converted_date,todo_id);\n            all_todos.push(new_todo);\n            persistToStorage();\n            setUpViews(new_todo);\n            input_text.value = \"\";\n            input_text.focus();\n        } else {\n            console.log(\"Fill all fields\");\n        }\n    }\n\n    const setUpViews = (newToDo) => {\n        const divWithSameDate = document.querySelector(`[name=\"${newToDo.date}\"]`);\n        if (!divWithSameDate) {\n            const newDiv = createDivByDate(newToDo.date); \n            newDiv.appendChild(create_element_container(newToDo.note,newToDo.id));\n            append_div_toMain(newDiv);\n        } else {\n            divWithSameDate.appendChild(create_element_container(newToDo.note,newToDo.id));\n            append_div_toMain(divWithSameDate);\n        }\n    }\n\n    const createDivByDate = (heading_text) => {\n        const project_div = create_div(heading_text, \"project-by-date\", heading_text);\n        const heading = document.createElement('h2');\n        heading.textContent = heading_text;\n        heading.className = \"todo-heading\";\n        project_div.appendChild(heading);\n       \n        return project_div;\n    }\n\n    const deleteElement = (elementName) => {\n        const elementsToRemove = document.getElementsByName(elementName);        \n        elementsToRemove.forEach((ele) => {\n            const parent = ele.parentNode;\n            const noteToRemove = ele.querySelector('.todo-text').innerText;\n            \n            const removedIndex = all_todos.map(function(item) {return item.note;}).indexOf(noteToRemove);\n            all_todos.splice(removedIndex,1);\n            persistToStorage();\n            \n            if (parent.childElementCount == 2) {\n                parent.removeChild(ele);\n                parent.remove();\n            } else {\n                parent.removeChild(ele);\n            }\n        })   \n    }\n\n    const editElement = (elementName) => {\n        const textToEdit = document.getElementById(elementName);\n        // textToEdit.focus();\n        textToEdit.contentEditable = \"true\";\n        textToEdit.style.border = \"2px solid\";\n    }  \n   \n    const create_element_container = (input_text,baseID) => {\n        const todoIndex = all_todos.map(function(item) {return item.id;}).indexOf(baseID);\n        const element_container_name = \"div\" + baseID;\n        const element_container = create_div(element_container_name, 'li-container') \n \n        const todo_p = document.createElement('p');\n        todo_p.textContent = input_text ;\n      \n        todo_p.setAttribute(\"type\",\"text\");\n        todo_p.className = 'todo-text';\n        todo_p.id = \"p\" + element_container_name;\n        todo_p.addEventListener('keypress', (event) => {\n            if (event.key === \"Enter\") {\n                all_todos[todoIndex].note = todo_p.innerText;\n                persistToStorage();\n                todo_p.contentEditable = false;\n                todo_p.style.border = \"none\";\n            }\n        })\n\n        const checkBox = create_inputButton('checkbox','status');\n        checkBox.checked = all_todos[todoIndex].status;\n        if (checkBox.checked) {\n            element_container.style.border = \"dotted\";\n        } \n        \n        checkBox.addEventListener('change', () => {\n            if (checkBox.checked) {\n                all_todos[todoIndex].status = checkBox.checked;\n                element_container.style.border = \"dotted\";\n            } else {\n                all_todos[todoIndex].status = checkBox.checked;\n                element_container.style.border = \"none\";\n                element_container.style.borderBottom = '1px solid'\n            } \n            persistToStorage();\n        })\n        element_container.appendChild(checkBox);\n        element_container.appendChild(todo_p);\n        create_buttons_container(element_container,element_container_name,todo_p.id)\n        \n        return element_container;\n    }\n\n    const create_buttons_container = (element_container,element_container_name,element_container_id) => {\n        const buttons_dropdown = create_div(\"dropdown\",\"dropdown\");\n        \n        const buttons_container_id = \"dd-\"+element_container_name;\n        const buttons_container = create_div(\"buttons-container\", \"buttons-container\",buttons_container_id);\n        \n        const dropdownBtn_id = \"db-\" + element_container_name;\n        const dropdownBtn = create_icon_container(\"dropButton\",\"fas fa-bars\",element_container_name,dropdownBtn_id);\n        dropdownBtn.addEventListener('click', (event) => {\n            show_dropDowns(buttons_container_id);\n            event.stopPropagation();\n        })\n\n        window.addEventListener('click',  close_dropDowns)\n     \n        const delete_icon = create_icon_container('delete-todo','fas fa-trash',element_container_name);\n        delete_icon.addEventListener('click', () => {\n            deleteElement(element_container_name)\n        })\n\n        const edit_icon = create_icon_container('edit-todo','fas fa-pen',element_container_name);\n        edit_icon.addEventListener('click', () => {\n            editElement(element_container_id);\n        })\n\n        const plus_icon = create_icon_container('add-cat', 'fas fa-user-plus',element_container_name)\n\n        //create pop up box\n        const modalBox_id = \"modalbox-\" + element_container_name;\n        const modalBox = create_div(\"modalBox\",\"modalBox\",modalBox_id);\n        const modalBoxContent = createPopUp(modalBox_id,element_container_name,modalBox)\n\n        const modalBox_body = modalBoxContent.querySelector('#' + \"body-\"+modalBox_id);\n\n        plus_icon.addEventListener('click', () => {\n            modalBox_body.innerHTML = \"\";\n            modalBox.style.display = \"flex\"; \n            const newBody = _createOptions__WEBPACK_IMPORTED_MODULE_0__.CategoriesList.addCheckBoxToCategory(modalBox_id,modalBox_body);\n            modalBoxContent.appendChild(newBody);\n        })\n\n        buttons_container.appendChild(delete_icon);\n        buttons_container.appendChild(edit_icon);\n        buttons_container.appendChild(plus_icon);\n\n        buttons_dropdown.appendChild(dropdownBtn);\n        buttons_dropdown.appendChild(buttons_container);\n        element_container.appendChild(buttons_dropdown);\n\n        modalBox.appendChild(modalBoxContent);\n        element_container.appendChild(modalBox);\n    }   \n\n    const createPopUp = (modalBox_id,element_container_name,modalBox) => {\n        const modalBoxContent = create_div(\"modalBoxContent\",\"modalBoxContent\");\n        const closeIcon_id = \"close-icon-\" + modalBox_id\n        const closeIcon = create_icon_container('close-icon','fas fa-times',element_container_name,closeIcon_id);\n        closeIcon.addEventListener('click', () => {\n            modalBox.style.display = 'none'\n        })\n       \n        const modalBoxHeader = document.createElement('h2');\n        modalBoxHeader.innerText = \"Please choose a category\";\n       \n        const modalBox_body_id = \"body-\"+modalBox_id;\n        const modalBox_body = create_div(\"popUpBox-body\",\"popUpBox-body\",modalBox_body_id);\n        \n        modalBoxContent.appendChild(closeIcon);\n        modalBoxContent.appendChild(modalBoxHeader);\n        modalBoxContent.appendChild(modalBox_body);\n        return modalBoxContent\n    }\n\n    const show_dropDowns = (dropDownDivId) => {\n        const toggleClass = (el, className) => el.classList.toggle(className);\n        toggleClass(document.getElementById(dropDownDivId),\"show\");\n    }\n    \n    const close_dropDowns = () => {\n        const dropdowns = document.getElementsByClassName('buttons-container');\n        for (let i = 0; i < dropdowns.length; i++) {\n            let openDropDown = dropdowns[i];\n            if (openDropDown.classList.contains('show')) {\n                openDropDown.classList.remove('show');\n            }\n        }\n    }\n\n    const create_icon_container = (iconContainer_class, icon_class, iconContainer_name,iconContainer_id=\"\") => {\n        const icon_container = document.createElement('button');\n        icon_container.name = iconContainer_name;\n        icon_container.setAttribute(\"class\", iconContainer_class);\n        icon_container.id = iconContainer_id;\n        const icon = document.createElement('i');\n        icon.className = icon_class;\n        icon_container.appendChild(icon);\n        return icon_container;\n    }\n\n    const persistToStorage = () => {\n        localStorage.setItem(TODO_STORAGE_ID, JSON.stringify(all_todos));\n    }\n\n    const loadFromStorage = () => {\n        const myToDoFromStorage = JSON.parse(localStorage.getItem(TODO_STORAGE_ID));\n        if (myToDoFromStorage !== null) {\n            all_todos = myToDoFromStorage;\n            console.log(all_todos)\n        } else {\n            all_todos = [];\n        }\n        all_todos.forEach(setUpViews);\n    }\n    \n    return {\n        ToDoObject,\n        create_div,\n        append_div_toMain,\n        create_element_container,\n        input_container,\n        updateToDoList,\n        createDivByDate,\n        create_icon_container,\n        close_dropDowns,\n        createPopUp,\n        create_inputButton,\n        all_todos,\n        loadFromStorage,\n        getTodos,\n        getDate,\n        getNote,\n        getDate,\n        getStatus,\n        getCategory,\n        setCategory,\n        persistToStorage,\n    };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewToDo);\n\n//# sourceURL=webpack://to-do-list/./src/createNewTodo.js?");

/***/ }),

/***/ "./src/createOptions.js":
/*!******************************!*\
  !*** ./src/createOptions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NewOption\": () => (/* binding */ NewOption),\n/* harmony export */   \"CategoriesList\": () => (/* binding */ CategoriesList)\n/* harmony export */ });\n/* harmony import */ var _createNewTodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNewTodo */ \"./src/createNewTodo.js\");\n\n\nconst NewOption = (() => {\n    const side_bar = document.getElementById('side-bar');\n\n    const create_allProjectsContainers = () => { \n        const allProjectsContainers = document.createElement('div');\n        allProjectsContainers.id = \"all-projects\";\n        document.querySelector('body').appendChild(allProjectsContainers)\n    }\n\n    const create_form_layout = () => {    \n        const menu_form = document.createElement('form');\n        const form_label = document.createElement('label');\n        form_label.innerText = \"Category\\n\";\n\n        const input_form = document.createElement('input');\n        input_form.type = 'text';\n        input_form.id = 'category-input';\n        input_form.placeholder = \"Enter a category\"\n\n        const addBtn = document.createElement('button');\n        addBtn.textContent = \"Add\"\n        addBtn.id = \"add-button\";\n        addBtn.addEventListener('click',create_new_option);\n\n        const categories_label = document.createElement('label');\n        categories_label.for = \"list\";\n        categories_label.innerText = \"\\n\\nAll\\n\";\n\n        const options_listBox = document.createElement('select');\n        options_listBox.id = 'list';\n        options_listBox.multiple = true;\n\n        const removeBtn = document.createElement('button');\n        removeBtn.id = \"remove-button\";\n        removeBtn.textContent = \"Remove\"\n        removeBtn.addEventListener('click', remove_selected_options);\n        \n        const homeBtn = document.createElement('button');\n        homeBtn.setAttribute(\"id\",\"home-btn\")\n        homeBtn.textContent = \"Home Page\";\n        homeBtn.addEventListener('click', () => {\n            const main = document.getElementById('main')\n            main.style.display='block';\n            hidePresentDiv(\"\");\n        })\n       \n        side_bar.appendChild(homeBtn)\n        menu_form.appendChild(form_label);\n        menu_form.appendChild(input_form);\n        menu_form.appendChild(addBtn);\n        menu_form.appendChild(categories_label);\n        menu_form.appendChild(options_listBox);\n        menu_form.appendChild(removeBtn);\n               \n        side_bar.appendChild(menu_form);\n        \n        const categories_list = document.createElement('ul');\n        categories_list.id = 'categories-list';\n        side_bar.appendChild(categories_list);\n    }\n \n    const create_new_option = (event) => {\n        const entered_category = document.querySelector('#category-input');\n        const options_box = document.querySelector('#list').options;\n        const categories_menu = document.querySelector('#categories-list');\n        // validate the option\n        if ((entered_category.value == '') || (!isNaN(entered_category.value))) {\n            alert('Please enter the name.');\n            return;\n        }\n        // create a new option\n        const new_option = new Option(entered_category.value, entered_category.value);\n        \n        // add it to the box\n        options_box.add(new_option);\n\n        // reset the value of the input\n        entered_category.value = '';\n        entered_category.focus();\n        event.preventDefault();\n\n        //add to categories menu below\n        addToCategoriesList(categories_menu,new_option.value);\n        \n        //add to the array \n        CategoriesList.insert_category(new_option.value);\n    }\n\n    const remove_selected_options = (event) => {\n        const options_box = document.querySelector('#list');\n        const categories_menu = document.querySelector('#categories-list');\n\n        //remove from the box\n        const removed_index = options_box.selectedIndex;\n        options_box.remove(removed_index);    \n        event.preventDefault();\n        // remove from categories menu\n        categories_menu.removeChild(categories_menu.childNodes[removed_index]);\n        //remove from array\n        CategoriesList.remove_category(removed_index)\n    }\n    \n    const addToCategoriesList = (main_list,addedCategory) => {\n        const categoryContainer = document.createElement('li');\n        categoryContainer.innerText = addedCategory;\n        categoryContainer.className = 'added-category';\n        categoryContainer.id = addedCategory;\n        categoryContainer.addEventListener('click', () => {\n            const categoryDivId = addedCategory + \"-populate\";\n            const main = document.getElementById('main')\n            main.style.display='none';\n            configureEachCategoryViews(addedCategory,categoryDivId);\n            hidePresentDiv(categoryDivId)            \n        })\n        main_list.appendChild(categoryContainer);\n\n    }\n\n    const hidePresentDiv= (categoryDivId) => {\n        const allPresentDivs = document.querySelectorAll('.category-div');\n            allPresentDivs.forEach((div) => {\n                if (div.id != categoryDivId ) {\n                    div.style.display = \"none\";\n                } else {\n                    div.style.display = \"block\";\n                }\n            })\n    }\n    \n    const configureEachCategoryViews = (addedCategory,categoryDivId) => {\n        const allProjectsContainers = document.getElementById('all-projects');      \n        const existingDiv = document.querySelector(`#${categoryDivId}`);\n        if (existingDiv) {\n            const allps = existingDiv.querySelectorAll('p');\n            allps.forEach((p) => p.remove())\n            const new_div = CategoriesList.populateToDos(addedCategory,existingDiv);\n            allProjectsContainers.appendChild(new_div) \n\n        } else {\n                const categoryDiv = document.createElement('div');\n                categoryDiv.className = 'category-div';\n                categoryDiv.id = categoryDivId;\n                const heading = document.createElement('h2');\n                heading.textContent = addedCategory;\n                categoryDiv.appendChild(heading)\n                const new_categoryDiv = CategoriesList.populateToDos(addedCategory,categoryDiv);\n                allProjectsContainers.appendChild(new_categoryDiv)\n            }\n        }\n    \n    return {create_form_layout,\n        remove_selected_options,side_bar,\n        create_new_option,\n        addToCategoriesList,\n        configureEachCategoryViews,\n        create_allProjectsContainers\n    };\n})();\n\n\nconst CategoriesList = (() => {\n    let categoriesList = [];\n    const insert_category = (category) => {\n        categoriesList.push(category);\n        localStorage.setItem(\"CategoriesArrayStorage\", JSON.stringify(categoriesList));\n    }\n\n    const remove_category = (categoryIndex) => {\n        categoriesList.splice(categoryIndex,1);\n        localStorage.setItem('CategoriesArrayStorage', JSON.stringify(categoriesList)); \n    }\n\n    const addCheckBoxToCategory = (modalBox_id,parent_div) => {  \n        categoriesList.forEach((category) => {\n            const cat_element_id = category+ \"-\" + modalBox_id;\n            const cat_element = _createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.create_div(category,'listed-category',cat_element_id);\n            const checkBox = _createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.create_inputButton('checkbox',`checkbox-${category}`);\n            const checkBoxId = \"radio-\"+cat_element_id;  \n            checkBox.setAttribute(\"id\",checkBoxId)\n            const cat_element_p = document.createElement('p');\n            cat_element_p.innerText = category;\n            cat_element.appendChild(checkBox);\n            cat_element.appendChild(cat_element_p);\n            parent_div.appendChild(cat_element);\n\n            checkBox.addEventListener('change', () => {\n                updateItemCategory(modalBox_id,checkBox,cat_element_p)\n            })\n            ifCheckBoxIsChecked(checkBox,cat_element_p.innerText,modalBox_id)\n\n        })  \n        return parent_div;    \n    } \n    \n    const ifCheckBoxIsChecked = (checkBox,checkBoxText,modalBox_id) => {\n        _createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.getTodos().map((item) => {\n            if (modalBox_id.includes(item.id)) {\n                checkBox.checked = item.category == checkBoxText;            \n            }})\n    }\n\n    const updateItemCategory = (modalBox_id,checkBox,cat_element_p) => {\n        _createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.getTodos().map((item) => {\n            if (modalBox_id.includes(item.id)) {\n                if (checkBox.checked) {\n                    item.category = cat_element_p.innerText;\n                } else {\n                    item.category = \"\";\n                }\n            }\n        })\n\n        _createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.persistToStorage();\n    }\n\n    const populateToDos = (category,master_div) => {\n        const newtodos = _createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();\n        newtodos.map((item) => {\n            if (item.category == category) {\n                const categoryTodo = document.createElement('p');\n                categoryTodo.setAttribute(\"class\",\"category-note\");\n                const categoryTime = document.createElement('p');\n                categoryTime.setAttribute(\"class\",\"category-time\");\n                categoryTodo.innerText = item.note;\n                categoryTime.innerText = item.date;\n                master_div.appendChild(categoryTodo)\n                master_div.appendChild(categoryTime)\n            }\n        })\n        return master_div;\n    }\n\n    const populateViews = () => {\n        const options_box = document.querySelector('#list');\n        const categories_menu = document.querySelector('#categories-list');\n        categoriesList.forEach((category) => {\n            const addedOption = new Option(category,category);\n            options_box.options.add(addedOption);\n            NewOption.addToCategoriesList(categories_menu,category);    \n            })\n        }                 \n   \n\n    const loadFromStorage = () => {    \n        let categoriesArrayFromStorage = JSON.parse(localStorage.getItem(\"CategoriesArrayStorage\"));\n        if ((categoriesArrayFromStorage !== null)){\n            categoriesList = categoriesArrayFromStorage;\n            console.log(categoriesList)\n        } else {\n            categoriesList = [];\n        }\n    }\n    \n    return {\n        insert_category,\n        addCheckBoxToCategory,\n        remove_category,\n        populateToDos,\n        categoriesList,\n        loadFromStorage,\n        populateViews,\n        ifCheckBoxIsChecked,\n        \n    }\n})();\n\n\n\n//# sourceURL=webpack://to-do-list/./src/createOptions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createNewTodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNewTodo */ \"./src/createNewTodo.js\");\n/* harmony import */ var _createOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createOptions */ \"./src/createOptions.js\");\n\n\n\n_createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.input_container()\n_createOptions__WEBPACK_IMPORTED_MODULE_1__.NewOption.create_form_layout()\n_createOptions__WEBPACK_IMPORTED_MODULE_1__.NewOption.create_allProjectsContainers()\n\n_createNewTodo__WEBPACK_IMPORTED_MODULE_0__.default.loadFromStorage()\n_createOptions__WEBPACK_IMPORTED_MODULE_1__.CategoriesList.loadFromStorage()\n_createOptions__WEBPACK_IMPORTED_MODULE_1__.CategoriesList.populateViews()\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;