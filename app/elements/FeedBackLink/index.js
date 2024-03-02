import React from "react";

const ReserveButton = ({apartment}) => {
  const url = `whatsapp://send?text=Hi, I will like to book for this apartment(${apartment.title}) at ${apartment.location} you listed on Tiara Crest Website&phone=2348127993148`;

  const linkStyle = {
    backgroundColor: "#191F59",
    color: "white",
    padding: "15px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "1000",
  };

  // implement apartment link fro apartment

  return (
    <div style={containerStyle}>
      <a style={linkStyle} href={url} class="call-show" target="_blank" onclick="if (!window.__cfRLUnblockHandlers) return false; doSubmitReq('W')"> Reserve Apartment  </a>
      {/* <a href={url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        Reserve Apartment
      </a> */}
    </div>
  );
};

export default ReserveButton;
