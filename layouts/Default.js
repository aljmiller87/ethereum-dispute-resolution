import React from "react";

import Header from "components/nextjs-material-kit/Header/Header.js";
import HeaderLinks from "components/nextjs-material-kit/Header/HeaderLinks.js";
import Footer from "components/nextjs-material-kit/Footer/Footer.js";

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
