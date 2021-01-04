import { useEffect, useState } from "react";

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      // console.log("Location Change");

      setCurrentPath(window.location.pathname); // Note that the .pathname was already changed manually from Link.js when we click on a link.
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
  // return window.location.pathname === path ? children : null; // same as using currentPath
};

export default Route;
