import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getAnimalName } from "../../../redux/actions/getAnimalsA.js";
import { resetPagination } from "../../../redux/actions/paginadoA.js";
import lupa from "./Img/Lupa.png";
// import "./SearchBarAnim.module.css";


export default function SearchBarProd() {

    const dispatch = useDispatch();

    const[name, setName] = useState("");

    function handlerInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handlerSubmit(e) {
        e.preventDefault(e);
        if (name !== "") {
            dispatch(getAnimalName(name));
            dispatch(resetPagination({current: 1}));
            setName("");
        } else {
            alert ("Enter a name of animal");
        }
    }

    

    return (
        <div className='container-searchBarAnim'>
            <input
            className='input-search'
            type="text"
            placeholder='Search...'
            autoComplete='off'
            value={name}
            onChange={(e) => handlerInputChange(e)}
            onKeyDown={(e) => e.key === "Enter" && handlerSubmit(e)}
            />
            <button className="btn-search" type="submit" onClick={(e) => handlerSubmit(e)}>
                <img className="lupa-icon" src={lupa} alt="" weight="16px" height="16px" />
            </button>
        </div>
    );
}
