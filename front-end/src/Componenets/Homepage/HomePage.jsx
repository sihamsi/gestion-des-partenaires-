// Homepage.jsx
import React from "react";
import cashplus_icon from "../Assets/cashplus.png";
const Homepage = () => {
  //const [click, setClick] = useState(false);
  return (
    <>
      <div className="homepage">
        <div className="homepae-container">
          <img src={cashplus_icon} alt="cashplus-icon" />
        </div>
      </div>
    </>
  );
};

export default Homepage;
