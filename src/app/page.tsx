// import Image from "next/image";
"use client";

export default async function Home() {
  type carModel = {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
  };

  const endpoint = process.env.NEXT_PUBLIC_MODEL_API;

  let posts;
  if (endpoint) {
    let data = await fetch(endpoint);
    posts = await data.json();
  }

  const handleChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="mx-auto font-bold">The Car Dealer App</h1>
        <p>
          The application will allow users to filter vehicles by type and model
          year, and view the results on a separate page.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {posts ? (
            <form>
              <label>Please, choose your model</label>
              <select
                name="model"
                onChange={handleChange}
                className="border-2 border-gray-950 rounded-lg ml-8"
              >
                <option value="" disabled></option>
                {posts.Results.map((post: carModel) => (
                  <option key={post.MakeId} value={post.MakeName}>
                    {post.MakeName}
                  </option>
                ))}
              </select>
            </form>
          ) : (
            <p>Something went wrong</p>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          This is a test
        </p>
      </footer>
    </div>
  );
}
