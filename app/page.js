import CardComponents from "./_component/card";

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <CardComponents title="Suggest 1 2 23">
        <p>Suggest 1 2 23</p>
        <img className="w-64 h-48 object-cover rounded-md" src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt=""/>
      </CardComponents>
    </div>
  );
}
