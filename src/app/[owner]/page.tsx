export default function Owner({ params }: { params: { owner: string } }) {
  return <div>Owner: {params.owner}</div>;
}
