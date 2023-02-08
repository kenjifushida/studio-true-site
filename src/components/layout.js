/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import Header from "./header"
import "../styles/layout.scss"

function getInitialViewMode() {
  const isBrowser = typeof window !== "undefined";
  if(!isBrowser) {
    return undefined;
  }
  const viewPreference = window.localStorage.getItem('view-mode');
  const hasViewPreference = typeof viewPreference === 'string';
  // if user has chosen a preference
  if(hasViewPreference) {
      return viewPreference;
  }
  // If no preference is found, default to line
  return 'line';
}

export const ThemeContext = React.createContext(getInitialViewMode());

const Layout = ({ headerRef, pageTitle, children }) => {
  const [viewMode, rawSetViewMode] = React.useState(undefined);

  React.useEffect(()=> {
    const view = getInitialViewMode();
    rawSetViewMode(view);
  }, [])
  const setViewMode = (value) => {
    rawSetViewMode(value);

    window.localStorage.setItem('view-mode', value);
  };

  return (
    <ThemeContext.Provider value={{viewMode, setViewMode}}>
      <Header headerRef={headerRef} siteTitle={`Title`} pageTitle={pageTitle} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
      </div>
    </ThemeContext.Provider>
  )
}

export default Layout
