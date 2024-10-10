"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getModelByParams } from "@/app/api/fetch";

export default function Cars() {
  const [models, setModels] = useState();
  const pathname = usePathname();
  console.log("pathname", pathname);
  const arrPath = pathname.split("/");
  console.log(arrPath);

  useEffect(() => {
    const data = async () => {
      try {
        const fetchedModels = await getModelByParams(arrPath[2], arrPath[3]);
        setModels(fetchedModels);
        console.log("fetchedModels", fetchedModels.Results);
      } catch (error) {
        console.error("Error fetching products by ID:", error);
      }
    };
    data();
  }, []);
  let render;
  if (models) {
    render = models.Results;
  }

  return (
    <ul>
      {render.map((model: any) => (
        <li key={model.Make_ID}>
          <p>
            <span>Make_Name: </span>
            {model.Make_Name}
          </p>
          <p>
            <span>"Model_ID: </span>
            {model.Model_ID}
          </p>
          <p>
            <span>"Model_Name: </span>
            {model.Model_Name}
          </p>
        </li>
      ))}
    </ul>
  );
}
// {
//     "Make_ID": 454,
//     "Make_Name": "BUGATTI",
//     "Model_ID": 19517,
//     "Model_Name": "Chiron"
// }
