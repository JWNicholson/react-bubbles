import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [ dependency, setDependency ] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
        .then(res => {
          console.log(res.data);
          setColorList(res.data);
          setDependency(false);
        })
          .catch(err => {
            console.log("BubblePage get/colors error: ", err.response);
          })
  },[dependency])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
