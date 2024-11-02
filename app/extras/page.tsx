import HackedComponent from "@/components/hacked-components";
import { experimental_taintObjectReference } from "react";

function getData() {
  const keys = {
    apiKey: "test1234124",
    secret: "testqfgaweg",
  };
  experimental_taintObjectReference("API key was exposed", keys);
  // experimental_taintUniqueValue("Secret key was exposed", keys, keys.secret);
  return keys;
}

export default async function Extras() {
  const data = getData();
  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="font-roboto text-6xl">Extras!!</h1>
      <h2 className="font-rubik">So much more to leanr</h2>
      <p className="font-d2coding">
        D2Coding is a Korean font that is used for coding. It is a monospace
        font that is easy to read and write.
        <br />
        <br />
      </p>
      <HackedComponent data={data} />
    </div>
  );
}
