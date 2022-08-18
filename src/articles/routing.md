This article is a step-by-step guide on how to create a simple navigation bar using React.js, styled components for styling, and react router to handle routing.
NOTE: This article has been updated to use the latest version of react router, that is, version 6.

### Table of contents
- [Prerequisites](#prerequisites)
- [Setting up the React environment](#setting-up-react-environment)
- [Installing the required dependencies](#installing-the-required-dependencies)
- [Structuring the project](#structuring-the-project)
- [Creating the navbar component](#creating-the-navbar-component)
- [Styling the navbar component](#styling-the-navbar-component)
- [Implementing routes](#implementing-routes)
- [Adding content to the pages](#adding-content-to-the-pages)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you will need to have:
- Basic knowledge of React JS.


### Setting up the React environment
In the terminal, run the following command to create a React application using Create React App.
```bash
npx create-react-app my-app
```

Once the process is done, run the following command to get into the my-app folder.
```bash
cd charts-app
```

### Installing the required dependencies
Install `react-router-dom` using the following command in your terminal.
```bash
npm install react-router-dom
```

We will use styled components for styling, therefore install it using the command below.
```bash
npm install --save styled components
```

Lastly, we will need some icons for the project. For this, we will use `react-icons`. Install it using the command below.
```bash
npm install react-icons --save
```

Once the installation of the above is done, start the React application using the following command.
```bash
npm start
```

### Structuring the project

Create a folder named `components` in the `src` folder.
Inside the `components` folder, create a another folder named `Navbar`.
Inside the Navbar folder, create two files named `index.js` and `NavbarElements.js`.

We will create another folder for the pages.
Go to `src` folder and create a folder named `pages`.
Inside pages create the following files.
`index.js`
`about.js`
`contact.js`
`signin.js`
`signup.js`

These will be the web pages on our website.

### Creating the navbar component

Go to the `components/Navbar/index.js` file and create a functional component, Navbar.
#### index.js

```javascript
import React from "react";

const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink 
                  to="/"
                  activeStyle={{ color:'black' }}
                >
                    Home
                </NavLink>
                <NavLink 
                  to="/about"
                  activeStyle={{ color: 'black' }}
                >
                    About
                </NavLink>
                <NavLink 
                  to="/contact" 
                  activeStyle={{ color: 'black' }}
                >
                    Contact
                </NavLink>
                <NavLink
                  to="/signin"
                  activeStyle={{ color: 'black' }}
                >
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                </NavBtn>
            </NavMenu>
           </Nav> 
        </>
    );
};
export default Navbar;
```
The code snippet above is the navbar component which includes the logo and various links.
We will use style-components for styling hence the reason why we installed `npm install --save styled components` as one of our dependencies.
In `NavbarElements.js`, include the following styles.

### Styling the navbar component

In `NavbarElements.js`, include the following styles.

```javascript
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: orangered;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;

`;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&:hover {
  color: black;
}
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
```

At the top of the file, we are importing FaBars which is an icon from `react-icons`. We are also importing `styled` from `styled-components` and lastly Navlink as Link from `react-router-dom`.
Styled components allows you to include pseudo selectors and media queries when writing your styles, similar to how you would write them when using SASS/SCSS.

Go to `components\Navbar\index.js` and import the following from `NavbarElements.js` just before the functional component.

```javascript
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
```
### Implementing routes

In `App.js`, import the `Navbar` component and the pages. We will also import `BrowserRouter, Routes, Route` from `react-router-dom`.

```javascript
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import SignUp from './pages/signup';
import SignIn from './pages/signin';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

### Adding content to the pages

In the following pages, add placeholder text or any suitable content for your pages.

##### about.js
```javascript
const About = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, totam.</h1>
        </div>
    );
};

export default About;
```

##### contact.js
```javascript
const Contact = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
           <h1>Contact Us</h1> 
        </div>
    );
};

export default Contact;

```

##### index.js
```javascript  
const Home = () => {
  return (    
    <h1>Welcome to our website!</h1>
  );
};
  
export default Home;
```

##### signin.js
```javascript

const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
    </div>
  )
}

export default SignIn;

```

##### signup.js
```javascript

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up and get started</h1>
    </div>
  )
}

export default SignUp;

```

### Conclusion
In this article, we have created a navigation bar using React, styled components and react-router for routing.

Happy coding.

