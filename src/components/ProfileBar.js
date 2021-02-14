import React from 'react'
import { Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText } from 'react-sidebar-ui'
import 'react-sidebar-ui/dist/index.css';
import IsolationBar from "../../CalgaryHacks_DiscoDreams/src/components/IsolationBar";
import logo from './Logo.png';

function ProfileBar (props) {
    return (
      <div className={'ProfileBar' + props}>
        <Sidebar bgColor='black' isCollapsed={false}>
          <Logo
            image='/'
            imageName='profile-img'/>
          <LogoText>Profile Picture</LogoText>

          <div className="text-center">
              <div className="profile-img" style={{backgroundImage: 'url(images/about.jpg)'}} />
              <h1 id="colorlib-logo"><a href="index.html">Profile Name</a></h1>
            </div>
          
          <Item bgColor='black'>
            <Icon><i className="fas fa-home"/></Icon>
            Home
          </Item>
          <Item bgColor='black'>
            <Icon><i className="fas fa-info"/></Icon>
            About
          </Item>
          <Item bgColor='black'>
            <Icon><i className="fas fa-sitemap"/></Icon>
            My Website
          </Item>
          <Item bgColor='black'>
            <Icon><i className="far fa-address-book"/></Icon>
            Contacts
          </Item>
          <Item bgColor='black'>
            <Icon><i className="fas fa-rss-square"/></Icon>
            Blog
          </Item>
          <InputItem type='text' placeholder={'Search...'}/>

          <IsolationBar/>
        </Sidebar>

        
      </div>
    )
}
export default ProfileBar;
  