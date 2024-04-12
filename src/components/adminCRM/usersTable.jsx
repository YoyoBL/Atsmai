"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EditUserRole, deleteUser } from "@/actions/users.actions";
import { useState } from "react";
import ModalConfirm from "../common/modalConfirm";
import toast from "react-hot-toast";

const UsersTable = ({ users = [] }) => {
   // const [openModal, setOpenModal] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);

   function openModal(modalId, id) {
      const modal = document.getElementById(modalId);
      setSelectedUser(id);
      modal.showModal();
   }

   async function handleDelete() {
      let res;
      try {
         res = await deleteUser(selectedUser);
      } catch (error) {
         console.log(error);
      }
      if (!res.ok)
         return toast.error("Something wrong append, try again later");
      toast.success("User deleted");
      setSelectedUser(null);
   }

   async function handleRoleChange() {
      let res;
      try {
         res = await EditUserRole(selectedUser);
      } catch (error) {
         console.log(error);
      }
      if (!res.ok)
         return toast.error("Something wrong append, try again later");
      toast.success("User role updated");
      setSelectedUser(null);
   }

   return (
      <div className="overflow-x-auto">
         <table className="table table-zebra bg-base-100 ">
            {/* head */}
            <thead className="text-left bg-base-300">
               <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>CRM</th>
                  <th>Role</th>
               </tr>
            </thead>
            <tbody className="text-left">
               {users.map((user, index) => (
                  <tr key={user._id}>
                     <th>{index + 1}</th>
                     <td>{user.firstName + " " + user.lastName}</td>
                     <td>{user.email}</td>
                     <td>{user.country}</td>
                     <td>{user.city}</td>
                     <td>{user.role}</td>

                     <td>
                        <div className="flex gap-3">
                           <button
                              onClick={() =>
                                 openModal("modify-role-modal", user._id)
                              }
                              className="btn btn-circle btn-outline btn-warning btn-sm"
                           >
                              <PencilIcon className="h-4 w-4" />
                           </button>
                           <button
                              onClick={() =>
                                 openModal("delete-modal", user._id)
                              }
                              className="btn btn-circle btn-outline btn-error btn-sm"
                           >
                              <TrashIcon className="h-4 w-4" />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <ModalConfirm modalId="delete-modal" onConfirm={handleDelete} />
         <ModalConfirm
            modalId="modify-role-modal"
            message="Modify user role?"
            onConfirm={handleRoleChange}
         />
      </div>
   );
};

export default UsersTable;
