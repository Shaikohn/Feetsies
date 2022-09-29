import SearchBar from "../../Features/SearchBar/SearchBar";

//holala

function NavBarAnimals() {
  return (
    <div className="container-navBar">
      <div>
        <SearchBar />
      </div>
      <div>
        <ul>
          Species
          <li>Dog</li>
          <li>Cat</li>
        </ul>
      </div>
      <div>
        <button>Male</button>
      </div>
      <div>
        <button>Female</button>
      </div>
      <div>
        <button>Puppies</button>
      </div>
    </div>
  );
}

export default NavBarAnimals;