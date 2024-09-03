import axios from "axios";
import { useEffect, useState } from "react";

export default function Component() {
  const [imgURL, setImgURL] = useState("");

  const DogImg = async () => {
    const result = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(result);
    setImgURL(result.data.message);
  };

  useEffect(() => {
    DogImg();
  }, []);

  return (
    <>
      <img src={imgURL} alt="" />
    </>
  );
}
