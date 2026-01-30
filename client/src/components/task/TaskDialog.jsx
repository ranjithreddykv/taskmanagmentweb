import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmationDialog from "../Dialog";
import { useDuplicateTaskMutation, useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import Loader from "../Loader";
import { toast } from "sonner";
const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [duplicateTask] = useDuplicateTaskMutation();
  const duplicateHandler = async() => {
    try {
      const res = await duplicateTask(task._id);
      toast.success(res.message || "Duplicate Task created successfully");
    } catch (error) {
      toast.error(error.message || "Somthing went wrong");
    }
  };
  const items = [
    {
      label: "Open Task",
      icon: (
        <AiTwotoneFolderOpen className="mr-2 h-5 w-5 " aria-hidden="true" />
      ),
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className="mr-2 h-5 w-5 " aria-hidden="true" />,
      onClick: () => duplicateHandler(),
    },
    
  ];
  const [trash,{isLoading}]=useTrashTaskMutation()
  const deleteClicks =async () => {
    const res=await trash(task)
    toast.success(res.message || "Message Trashed successfully");
    
  };
 
  const deleteHandler = () => {};
  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left ">
          <MenuButton className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600">
            <BsThreeDots />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <MenuItem key={el.label}>
                    {({ focus }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          focus ? "bg-blue-500 text-white" : "text-gray-900 "
                        } groupt flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>
              <div className="px-1 py-1">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => deleteClicks()}
                      disabled={isLoading}
                      className={`${
                        focus ? "bg-red-500 p-2 text-white" : "text-red-500"
                      } group flex w-full items-center rounded-md px-2 text-sm`}
                    >
                      <MdOutlineDelete
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Trash
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime}
      />
      <AddSubTask open={open} setOpen={setOpen} id={task?._id}/>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;
