const Profile = () => {
   return (
      <section className="min-h-full p-3 grid place-items-center">
         <div className="card bg-base-200 w-full ">
            <div className="card-body justify-center text-center">
               <div className="card-title justify-center">Username</div>
               <div className="avatar justify-center">
                  <div className="w-40 rounded-full">
                     <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
               </div>
               <span>email</span>
               <span>Join date</span>
               <button className="btn btn-primary">Edit profile</button>
            </div>
         </div>
      </section>
   );
};

export default Profile;
