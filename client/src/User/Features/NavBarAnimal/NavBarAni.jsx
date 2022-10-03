import { useDispatch } from "react-redux";
import filterSexAnimals from "../../../redux/actions/filterSexAnimals.js";
import filterSizeAnimals from "../../../redux/actions/filterSizeAnimals.js";
import SearchBarAnim from "../SearchBarAnim/SearchBarAnim.jsx";
import "./NavBarAnimal.css";

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

  const arraySize = ["Small", "Medium","Large"]
  const arraySex = ["Male", "Female"]

  return (
    <div className="container-navBar">
      <div>
        <SearchBarAnim />
      </div>
      {
        arraySize.map((ele,id)=>{
          return(
            <div key = {id}>
              <button
              value={ele}
              onClick={e=>eventHandlerSize(e)}
              >
              {ele}
              </button>
            </div>
          )
        })
      }
      {
        arraySex.map((elem,id)=>{
          return(
            <div key={id}>
              <button
              value={elem}
              onClick={e=>eventHandlerSex(e)}
              >
                {elem}
              </button>
            </div>
          )
        })
      }
    </div>
  );
}

export default NavBarAnimals;
