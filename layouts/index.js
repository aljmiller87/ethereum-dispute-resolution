import React from "react";
import PropTypes from "prop-types";
import AppLayouts from "./AppLayouts";

const Layout = ({ layout, children }) => {
  const AppLayout = AppLayouts[layout];
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
Layout.defaultProps = {
  layout: "default",
};

Layout.propTypes = {
  layout: PropTypes.string,
};
