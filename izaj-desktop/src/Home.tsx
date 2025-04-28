import './App.css'

function App() {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-2 min-h-screen p-4">
      <div className="row-span-5 bg-red-300 flex justify-center items-center">1</div>
      <div className="col-span-4 bg-blue-300 flex justify-center items-center">2</div>
      <div className="col-start-2 row-start-2 col-span-2 row-span-2 bg-green-300 flex justify-center items-center">3</div>
      <div className="col-start-4 row-start-2 col-span-2 row-span-2 bg-yellow-300 flex justify-center items-center">4</div>
      <div className="col-start-2 row-start-4 col-span-3 row-span-2 bg-purple-300 flex justify-center items-center">5</div>
      <div className="col-start-5 row-start-4 row-span-2 bg-pink-300 flex justify-center items-center">6</div>
    </div>
  );
}

export default App;
