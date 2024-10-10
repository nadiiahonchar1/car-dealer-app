'use client'

const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

export const getModel = async () => {
    try {
        let data = await fetch(
      `${endpoint}/GetMakesForVehicleType/car?format=json`
    );
        const cars = await data.json();
        return cars
    } catch (err) {
        console.error(`Error ${err}`);
        throw err;
    }
}

export const getModelByParams = async (model:string, year:string) => {
  try {
    let data = await fetch(
      `${endpoint}/GetModelsForMakeIdYear/makeId/${model}/modelyear/${year}?format=json`
    );
    const cars = await data.json();
    return cars;
  } catch (err) {
    console.error(`Error ${err}`);
    throw err;
  }
};
