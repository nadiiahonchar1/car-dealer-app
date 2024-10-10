"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getModelByParams } from "@/app/api/fetch";

export default function Cars() {
  type model = {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
  };

  const [models, setModels] = useState();
  const pathname = usePathname();
  const arrPath = pathname.split("/");

  useEffect(() => {
    const data = async () => {
      try {
        const fetchedModels = await getModelByParams(arrPath[2], arrPath[3]);
        setModels(fetchedModels);
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
    <div>
      <h1 className="mx-auto font-bold mb-8">
        Cars model {render[0].Make_Name} for the {arrPath[3]} year:
      </h1>
      {models ? (
        <ul>
          {render.map((model: model) => (
            <li key={model.Make_ID} className="flex gap-8">
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
      ) : (
        <p>Something went wrong</p>
      )}
    </div>
  );
}
