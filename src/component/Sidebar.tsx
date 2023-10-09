
import DiscoveryIcon from "../assets/discovery.svg"
import RockRollIcon from "../assets/microphone.svg"
import LibaryIcon from "../assets/library-music.svg"
import ListAlbumIcon from "../assets/list-album.svg"
import MenuMobileIcon from "../assets/menu-mobile.svg"

import { Nav } from "react-bootstrap"
import { useState } from 'react';

export default function Sidebar() {
    const [stateSideBar, setStateSideBar] = useState(false)
    const onClick = () => {
        setStateSideBar(!stateSideBar)
    }
    return (
        <div className="sidebar">
            <div className="menu_mobile"
            onClick={onClick}
            ><img src={MenuMobileIcon} alt="Menu" /></div>
            <div className="sidebar-logo">
                <img src={"https://zing-onin.com/images/customLogo.png"} alt="logo" />
            </div>
            <div className={"sidebar-nav " + (stateSideBar ? "showsidebar" : "")}>
                <Nav className="nav_1">
                    <Nav.Item>
                        <img src={DiscoveryIcon} alt="Nhạc của tôi " />
                        <Nav.Link href="/">
                            Nhạc của tôi
                        </Nav.Link>

                    </Nav.Item>
                    <Nav.Item>
                        <img src={ListAlbumIcon} alt=" BXH tuần " />
                        <Nav.Link href="/">
                            BXH tuần
                        </Nav.Link>

                    </Nav.Item>
                    <Nav.Item>
                        <img src={RockRollIcon} alt="Rap Real " />
                        <Nav.Link href="/">
                        Rap Real 
                        </Nav.Link>

                    </Nav.Item>
                    
                </Nav>

              
            </div>
        </div>
    )
}