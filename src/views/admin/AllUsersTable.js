import CardTable from "components/Cards/CardTable.js";
import HeaderStats from "components/Headers/HeaderStats";

const AllUsersTable = () => {
    // const [showForm, setShowForm] = useState(false);
    // const [searchQuery, setSearchQuery] = useState('');

    // const handleAddUserClick = () => {
    //     setShowForm(!showForm);
    // };

    // const handleAdminAdded = () => {
    //     // Handle admin added logic here
    // };

   return (
    <div>
      <HeaderStats />
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <CardTable />
        </div>
       
      </div>
    </div>
   );
};

export default AllUsersTable;