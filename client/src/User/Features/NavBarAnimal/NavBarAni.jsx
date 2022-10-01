import { useDispatch } from "react-redux";
import filterSexAnimals from "../../../redux/actions/filterSexAnimals.js";
import filterSizeAnimals from "../../../redux/actions/filterSizeAnimals.js";
import SearchBar from "../SearchBar/SearchBar.jsx";

function NavBarAnimals() {
  const dispatch = useDispatch();
  const eventHandlerSize = (e) => {
    e.preventDefault();
    dispatch(filterSizeAnimals(e.target.value));
  };
  const eventHandlerSex = (e) => {
    e.preventDefault();
    dispatch(filterSexAnimals(e.target.value));
  };

  return (
    <div className="container-navBar">
      <div>
        <SearchBar />
      </div>
      <div>
        <button value="Small" onClick={(e) => eventHandlerSize(e)}>
          Small
        </button>
      </div>
      <div>
        <button value="Medium" onClick={(e) => eventHandlerSize(e)}>
          Medium
        </button>
      </div>
      <div>
        <button value="Large" onClick={(e) => eventHandlerSize(e)}>
          Large
        </button>
      </div>
      <div>
        <button value="Male" onClick={(e) => eventHandlerSex(e)}>
          Male
        </button>
      </div>
      <div>
        <button value="Female" onClick={(e) => eventHandlerSex(e)}>
          Female
        </button>
      </div>
    </div>
  );
}

export default NavBarAnimals;
