import React from "react";

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    // Command (on Mac) or Ctrl (on Windows) to open to new tab
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();

    window.history.pushState({}, "", href); // This only changes the url will not cause a refresh of the page.

    // Emit and event.  Will communicate to Route handlers that the url has changed.  Route handlers will listen for this event.
    const navEvent = new PopStateEvent("popstate"); // Event handler for the popstate event on the window
    window.dispatchEvent(navEvent); // Dispatches a syntetic event.
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
