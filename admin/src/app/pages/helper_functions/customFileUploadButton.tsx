import React from "react";

import {useState} from "react";


const CustomFileUploadButton=()=>{

    const [image,setImage]=useState(null);
    return(
      <div>
          <form>
              <input type='file' accept='image/*'/>
          </form>
      </div>
    );
}

export default CustomFileUploadButton;