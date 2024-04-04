import CardTable from "components/Cards/CardTable.js";
const AllUsersTable = () => {

   return (
    <div>
        <div className="w-full">
        <h1 className="text-center font-black text-2xl mb-5">Users</h1>
          <CardTable />
        </div>
      </div>
   );
};

export default AllUsersTable;