'use client'

export const getModel = async (endpoint: any) => {
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