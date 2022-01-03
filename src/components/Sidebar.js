import React, {useState} from 'react';
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import * as AiIcons from 'react-icons/ai';
import logo from '../logo/or_logo.png';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Sidebar = (props) => {
    
    const [option="VISTA GERAL",setOption] = useState();
    
    function handleSelect(value){
        setOption(value);
        console.log("SIDEBAR ---->", value)
        props.sidebarCallback(value);
    }
    
    
    return (
        <div className="sidebar">
            <div className='logo-before'>               
               </div>
            <div className='logo'>               
            </div>
            <div className='sidebar-menu'>
            <img src={logo} width={150}></img>
            <ul className="sidebarList">
            {SidebarData.map((val, key) => {
                return(
                   

                    <li key={key} onClick={()=> handleSelect(val.title)} value={val.title} className={'row' + (option === val.title ? " active" : " ")}>
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>

                    
                    </li>
                  
                )
            })}
            </ul>
            <ul className="sidebarList-exit">
            <div className='exit'>
                <li onClick={()=> {window.location.pathname='/';}}>

                <AiIcons.AiOutlinePoweroff size={26}/>
                </li>
            </div>
            </ul >
                Logout
            </div>
        </div>
    )
}

export default Sidebar
