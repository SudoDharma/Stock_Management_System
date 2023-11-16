const MetodePage = () => {
  return (
    <div>
      <title>Barang</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5 flex flex-col">
        <p className="font-medium">Metode</p>
        <button className="my-3 h-[35px] w-[180px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md">
          EOQ
        </button>
        <button className="my-3 h-[35px] w-[180px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md">
          MIN/MAX
        </button>
      </div>
    </div>
  );
};

export default MetodePage;
