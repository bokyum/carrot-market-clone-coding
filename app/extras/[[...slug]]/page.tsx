async function getData() {
  const data = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
}

interface ExtrasProps {
  params: { slug: string[] };
}

export default async function Extras({ params }: ExtrasProps) {
  const { slug } = await params;

  await getData();
  await getData();
  await getData();

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
      <p className="font-d2coding">
        <code>{slug?.join(", ")}</code>
      </p>
    </div>
  );
}
