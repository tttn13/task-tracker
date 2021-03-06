import NewToDo from "./createNewTodo";
import { NewOption, CategoriesList } from "./createOptions";

NewToDo.input_container();
NewOption.create_form_layout();
NewOption.create_allProjectsContainers();

NewToDo.loadFromStorage();
CategoriesList.loadFromStorage();
CategoriesList.populateViews();
