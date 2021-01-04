import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import DropDown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";

// Accordian data
const items = [
  {
    title: "What is React?",
    content: "React is a front end javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers ",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components",
  },
];

// Dropdown options
const options = [
  { label: "The Color Red", value: "red" },
  { label: "The Color Green", value: "green" },
  { label: "A Shade of Blue", value: "blue" },
];

export default () => {
  // Dropdown selected state (for specific dropdown instance)
  const [selected, setSelected] = useState(options[0]);
  // const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      {/* {showAccordion()}
      {showList()}
      {showDropdown()}
      {showTranslate()} */}

      <Header />

      <Route path="/">
        <Accordion items={items} />
      </Route>

      <Route path="/list">
        <Search />
      </Route>

      <Route path="/dropdown">
        <DropDown
          label="Select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>

      <Route path="/translate">
        <Translate />
      </Route>

      {/* <Accordion items={items} /> */}

      {/* <Search /> */}

      {/* <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ margin: "10px" }}
      >
        Toggle Dropdown
      </button>

      {showDropdown ? (
        <DropDown
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null} */}

      {/* <Translate /> */}
    </div>
  );
};

/*
const showAccordion = () => {
  if (window.location.pathname === "/") {
    return <Accordion items={items} />;
  }
};

const showList = () => {
  if (window.location.pathname === "/list") {
    return <Search />;
  }
};

const showDropdown = () => {
  if (window.location.pathname === "/dropdown") {
    return <DropDown />;
  }
};

const showTranslate = () => {
  if (window.location.pathname === "/translate") {
    return <Translate />;
  }
};
*/
