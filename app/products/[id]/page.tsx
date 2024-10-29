async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct();
  return <div>ProductDetail {id}</div>;
}
