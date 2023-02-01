import * as React from "react"
import { ThemeContext } from "./layout"
import BoxIcon from "../images/BoxIcon.svg"

const ViewToggle = ({className}) => {
    const { viewMode, setViewMode } = React.useContext(ThemeContext);
    
    if(!viewMode) {
        return null;
    }
    return (
        <BoxIcon active={viewMode} className={className}
        onClick={()=>{
            setViewMode(viewMode === 'line' ? 'box' : 'line');
        }} />
    )
}

export default ViewToggle;