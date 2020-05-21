import React from "react";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

const Default = ({ children }) => {
  return (
    <>
      <Header
        brand="Arbitration Distributed"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      {children}
      <Footer />
    </>
  );
};

export default Default;
