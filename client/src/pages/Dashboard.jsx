import { FaNewspaper, FaTasks } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { summary } from "../assets/data.js";
import Card from "../components/Card.jsx";
import Chart from "../components/Chart.jsx";
import TaskTable from "../components/task/TaskTable.jsx";
import UserTable from "../components/user/UserTable.jsx";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice.js";
import Loader from "../components/Loader.jsx"



const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();
  if(isLoading){
    return (<div className="py-10"><Loader/></div>)
  }
  const totals=data?.tasks;
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASKS",
      total: data?.completedTasks || 0,
      icon: <AiOutlineCheckCircle />,
      bg: "bg-[#059669]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: data?.inProgressTasks || 0,
      icon: <AiOutlineClockCircle />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: data?.todos || 0,
      icon: <FaTasks />,
      bg: "bg-[#7c3aed]",
    },
  ];
  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600">Chart by Priority</h4>
        <Chart data={data?.graphData} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left */}
        <div className="w-3/4">
          <TaskTable tasks={data?.last10Task} />
        </div>
        {/* right */}
        <div >
          <UserTable users={data?.users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
