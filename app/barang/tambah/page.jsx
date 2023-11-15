import AddForm from "./AddBarangForm";

const TambahBarangPage = () => {
  return (
    <div>
      <title>Barang</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Tambah barang</p>
        <div className="p-10 bg-white rounded-md shadow-md">
          <AddForm />
        </div>
      </div>
    </div>
  );
};

export default TambahBarangPage;
