import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import { auth } from "@/auth";
import Modal from "@/components/common/modal";
import EditProfile from "@/components/navs/profile/editProfile";
import { customFetch } from "@/lib/customFetch";
import { getDictionary } from "@/lib/dictionary";
import { format } from "date-fns";
import Link from "next/link";

const Profile = async ({ params: { lang } }) => {
   const { user } = await auth();

   const { register, profile } = await getDictionary(lang);
   const text = { ...register, ...profile };

   const userData = await customFetch(`/api/users/${user.id}`, {
      next: { tags: ["user"] },
   });

   const name = userData.firstName + " " + userData.lastName;
   const joinedAt = format(userData.createdAt, "dd/MM/yyyy");
   const { country, city } = userData;
   return (
      <section className="min-h-full p-3 grid place-items-center overflow-auto">
         <div className="card bg-base-200 w-full ">
            <div className="card-body justify-center text-center">
               <div className="card-title justify-center text-2xl">Profile</div>
               <div className="avatar justify-center">
                  <div className="w-40 rounded-full">
                     <img src={userData.image} alt="Profile image" />
                  </div>
               </div>

               <div className="bg-base-100 p-2 rounded-xl">
                  <table className="table">
                     <tbody>
                        {/* row 1 */}
                        <tr>
                           <td>{text.name}:</td>
                           <td>{name}</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                           <td>{text.joinedAt}:</td>
                           <td>{joinedAt}</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                           <td>{text.country}:</td>
                           <td>{country}</td>
                        </tr>
                        <tr>
                           <td>{text.city}:</td>
                           <td>{city}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="card-actions">
                  <Link
                     href={`/${lang}/profile?modal=true`}
                     className="btn btn-primary btn-block"
                  >
                     <Cog6ToothIcon className="h-6 w-6" />
                     {text.editBtn}
                  </Link>
               </div>
            </div>
         </div>
         <Modal>
            <EditProfile text={text} user={userData} />
         </Modal>
      </section>
   );
};

export default Profile;
