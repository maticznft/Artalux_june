import React from 'react';
import { Avatar } from '@material-ui/core';
import Profile from '../assets/images/no_profile2.png'
export default function Avatars(props){
return(
              <img src={Profile} className={props.item} alt="user"/>        
      
)}