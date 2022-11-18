import React, { useState } from "react";
import NavItem from "./NavItem";

//building the navbar for the webiste, which includes links for the home, projekt, statistics, about us and impressum site,
// to navigate through the webiste  


const MENU_LIST = [
  { text: "Home", href: "/" },
  {text: "My Library", href: "/"},
  { text: "Quiz-Room", href: "/" },
  { text: "Profile", href: "/" },

];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <>
      
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>

        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list bg-light center`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      <style jsx>
      {`

        a{
            text-decoration: none;
            color: inherit;
          }
          header{
            position: sticky;
            z-index: 30;
            top: 0;
          }
        //   nav{
        //     display: flex;
        //     padding-left: 16px;
        //     justify-content: space-between;
        //     align-items: center;
        //     background-color: inherit;

        //   }
          .nav__menu-bar{
            width: 40px;
            display: flex;
            flex-direction: column;
            row-gap: 6px;
            cursor: pointer;
        
          }
          .nav__menu-bar div{
            width: 40px;
            height: 4px;
            margin-right: 5px;
            background-color: black;
            border-radius: 2px;

          }
          .nav__menu-list{
            display: flex;
            flex-direction: column;
            position: fixed;
            z-index: 1;
            top: 70px;
            width: 288px;
            row-gap: 36px;
            right: -288px;
            padding-right:  16px;
            transition: all 0.2s;
            height: 100vh;
          }
          .nav__menu-list.active{
            right: 0;
          }
          .nav__link{
            font-size: 18px; 
            position: relative;
            transition: all 0.2s;
    
          }
          
          .nav__link:hover{
           font-weight: bold;
          }
          
          .center{
            min-height: 600px;
            display: flex;
            // justify-content: start;
            align-items: center;
          }
        //   @media screen and (min-width: 768px) {
        //     .nav__menu-bar{
        //       display: none;
              
        //     }
            .nav__menu-list{
              position: unset;
              flex-direction: row;
              min-height: fit-content;
              width: fit-content;
              column-gap: 24px;
              align-items: center;
            }
            .nav__link::before{
              content: '';
              position: absolute;
              width: 0%;
              height: 6px;
              bottom: -16px;
              left: 0;
              background-color: black;
              transition: all 0.2s;
            }
            
            .nav__link:hover:before{
             width: 100%;
            }
            h1{
              color:#F2F2F2;
            }
      `}
      </style>
    </>

  );
};

export default Navbar;