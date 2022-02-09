import './Menu.css'
import React from "react" 
import { Image } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import {auth} from "../../utils/firebase";
import iconbco from "../../images/icon-bco.png"

import { RiMoneyDollarCircleLine, RiAddCircleLine } from 'react-icons/ri';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';


const Menu = props => {
    const history = useHistory()
    async function handleLogout() {
        try {
          await auth.signOut()
          history.push("/login")
        } catch {
          alert("Failed to log out")
        }
      }
    
  return (
    <aside className="Menu">
        <nav>
            <ul>
                <li>
                <Image src={iconbco} sizes={'510%'} fluid 
                    style={
                        {width:"70%", 
                        marginLeft:"10%", 
                        paddingTop:"15%", 
                        paddingBottom:"20%"
                    }}
                />
                </li>
                <li>
                    <Link to="/home"><BiHomeAlt /> Home</Link>
                </li>
                <li>
                    <Link to="/manage"><RiMoneyDollarCircleLine /> Manage Tokens</Link>
                </li>
                <li>
                    <Link to="/vesting"><MdOutlineManageAccounts /> Create Vesting</Link>
                </li>
                <li>
                    <Link to="/liquidity"><RiAddCircleLine /> Add Liquidity</Link>
                </li>
                <li>
                    <Link to="/investors"><GiPayMoney /> Private Investors</Link>
                </li>
                <li>
                    <Link to="/nog"><GiReceiveMoney /> NOGs</Link>
                </li>
                <Button 
                    style={{ marginLeft: '25%', backgroundColor:'white', color:"#1e90ff" }} 
                     onClick={handleLogout}>
                    Log Out
                </Button>
            </ul>
        </nav>
    </aside>
)}

export default Menu