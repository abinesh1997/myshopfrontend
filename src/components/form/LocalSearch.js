
import "./style.css"
const LocalSearch = ({keyword, setKeyword}) => {
    const handleChange = (e)=>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };
    return (  
        <div className="filter_form">
            <input
            type= "search"
            placeholder = "Filter"
            value = {keyword}
            onChange = {handleChange}
            />
        </div>
    );
};
 
export default LocalSearch;