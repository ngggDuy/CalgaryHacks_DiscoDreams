import React from 'react'
import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";

export const ProfileBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/',
        icon: <GrIcons.GrCircleInformation />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },
    
]