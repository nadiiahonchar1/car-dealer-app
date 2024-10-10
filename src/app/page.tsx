"use client";
import { useEffect, useState } from "react";
import { getModel } from "./api/fetch";

import Link from "next/link";

export default function Home() {
  type carModel = {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
  };

  const [models, setModels] = useState();
  const [targetModel, setTargetModel] = useState();
  const [targetYear, setTargetYear] = useState();

  const data = new Date();
  const yearArr = [];

  for (let i = 2015; i <= data.getFullYear(); i++) {
    yearArr.push(i);
  }

  let posts;

  useEffect(() => {
    const data = async () => {
      try {
        const fetchedModels = await getModel();
        setModels(fetchedModels);
      } catch (error) {
        console.error("Error fetching products by ID:", error);
      }
    };
    data();
  }, []);

  const handleChangeModel = (e: any) => {
    setTargetModel(e.target.value);
  };

  const handleChangeYear = (e: any) => {
    setTargetYear(e.target.value);
  };

  return (
    <div>
      <h1 className="mx-auto font-bold mb-8">The Car Dealer App</h1>
      <p>
        The application will allow users to filter vehicles by type and model
        year, and view the results on a separate page.
      </p>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        {models ? (
          <form>
            <label>Please, choose your model</label>
            <select
              name="model"
              onChange={handleChangeModel}
              className="border-2 border-gray-950 rounded-lg block"
            >
              <option value="" disabled></option>
              {models.Results.map((model: carModel) => (
                <option key={model.MakeId} value={model.MakeId}>
                  {model.MakeName}
                </option>
              ))}
            </select>
            <label>Please, choose year</label>
            <select
              name="year"
              onChange={handleChangeYear}
              className="border-2 border-gray-950 rounded-lg block"
            >
              <option value="" disabled></option>
              {yearArr.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </form>
        ) : (
          <p>Something went wrong</p>
        )}
        {targetModel && targetYear && (
          <Link
            href={`/result/${targetModel}/${targetYear}`}
            className="border-2 border-gray-950 rounded-lg block p-2"
          >
            Go to /result/{targetModel}/{targetYear}
          </Link>
        )}
      </div>
    </div>
  );
}
