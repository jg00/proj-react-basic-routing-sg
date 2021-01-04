import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  // Control show/hide list of options and dropdown
  const [open, setOpen] = useState(false);

  // Direct reference to a DOM element
  const ref = useRef();

  useEffect(() => {
    // Mouse click any where in the browser
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    // Close dropdown if user clicks anywhere outside of the dropdown
    document.body.addEventListener("click", onBodyClick);

    // Clean up listener right before <DropDown /> component is removed from DOM
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  // Build each item
  const renderedOptions = options.map((option) => {
    // Exclude display of selected item from the option list
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        onClick={() => {
          onSelectedChange(option);
        }}
        key={option.value}
        className="item"
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="ui form" ref={ref}>
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown${open ? " visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu${open ? " visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
