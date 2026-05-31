// import { useState } from "react";

// function Profile() {

//   const [name, setName] =
//     useState("Swathi");

//   const [email, setEmail] =
//     useState("swathi@mavx.com");

//   const [phone, setPhone] =
//     useState("9876543210");

//   const handleSave = () => {

//     alert("Profile updated successfully!");

//   };

//   return (

//     <div className="min-h-screen bg-slate-950 text-white flex flex-col">

//       {/* HEADER */}

//       <header className="h-20 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">

//         <h1 className="text-3xl font-bold">
//           MaxX AI
//         </h1>

//         <a
//           href="/dashboard"
//           className="text-blue-400"
//         >
//           Back to Dashboard
//         </a>

//       </header>

//       {/* PROFILE CARD */}

//       <div className="flex flex-1 items-center justify-center">

//         <div className="bg-slate-900 p-10 rounded-3xl w-[500px] shadow-2xl border border-slate-800">

//           <div className="flex flex-col items-center mb-8">

//             <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold mb-4">

//               S

//             </div>

//             <h2 className="text-3xl font-bold">
//               User Profile
//             </h2>

//           </div>

//           {/* NAME */}

//           <div className="mb-5">

//             <label className="block mb-2 text-slate-400">
//               Name
//             </label>

//             <input
//               type="text"
//               value={name}
//               onChange={(e) =>
//                 setName(e.target.value)
//               }
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           {/* EMAIL */}

//           <div className="mb-5">

//             <label className="block mb-2 text-slate-400">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           {/* PHONE */}

//           <div className="mb-8">

//             <label className="block mb-2 text-slate-400">
//               Phone Number
//             </label>

//             <input
//               type="text"
//               value={phone}
//               onChange={(e) =>
//                 setPhone(e.target.value)
//               }
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           {/* SAVE BUTTON */}

//           <button
//             onClick={handleSave}
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl font-bold"
//           >

//             Save Changes

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Profile;

// import { useEffect, useState } from "react";

// function Profile() {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {

//     const user = JSON.parse(
//       localStorage.getItem("user")
//     );

//     if (user) {

//       setName(user.name || "");
//       setEmail(user.email || "");
//       setRole(user.role || "");

//     }

//   }, []);

//   const handleSave = () => {

//     const updatedUser = {
//       name,
//       email,
//       role
//     };

//     localStorage.setItem(
//       "user",
//       JSON.stringify(updatedUser)
//     );

//     alert("Profile updated successfully!");

//   };

//   return (

//     <div className="min-h-screen bg-slate-950 text-white flex flex-col">

//       <header className="h-20 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">

//         <h1 className="text-3xl font-bold">
//           MavX AI
//         </h1>

//         <a
//           href="/dashboard"
//           className="text-blue-400"
//         >
//           Back to Dashboard
//         </a>

//       </header>

//       <div className="flex flex-1 items-center justify-center">

//         <div className="bg-slate-900 p-10 rounded-3xl w-[550px] shadow-2xl border border-slate-800">

//           <div className="flex flex-col items-center mb-8">

//             <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold mb-4">

//               {name?.charAt(0)?.toUpperCase()}

//             </div>

//             <h2 className="text-3xl font-bold">
//               User Profile
//             </h2>

//             <p className="text-slate-400 mt-2">
//               {role?.toUpperCase()}
//             </p>

//           </div>

//           <div className="mb-5">

//             <label className="block mb-2 text-slate-400">
//               Name
//             </label>

//             <input
//               type="text"
//               value={name}
//               onChange={(e) =>
//                 setName(e.target.value)
//               }
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           <div className="mb-5">

//             <label className="block mb-2 text-slate-400">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               readOnly
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           <div className="mb-5">

//             <label className="block mb-2 text-slate-400">
//               Phone Number
//             </label>

//             <input
//               type="text"
//               value={phone}
//               onChange={(e) =>
//                 setPhone(e.target.value)
//               }
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           <div className="mb-8">

//             <label className="block mb-2 text-slate-400">
//               Role
//             </label>

//             <input
//               type="text"
//               value={role}
//               readOnly
//               className="w-full bg-slate-800 p-4 rounded-xl outline-none"
//             />

//           </div>

//           <button
//             onClick={handleSave}
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl font-bold"
//           >
//             Save Changes
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Profile;





import { useState, useEffect } from "react";

function Profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {

      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");

    }

  }, []);

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HEADER */}

      <header className="h-20 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">

        <h1 className="text-3xl font-bold">
          MavX AI
        </h1>

        <a
          href="/dashboard"
          className="text-blue-400"
        >
          Back to Dashboard
        </a>

      </header>

      {/* PROFILE */}

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="bg-slate-900 p-10 rounded-3xl w-[550px] shadow-2xl border border-slate-800">

          <div className="flex flex-col items-center mb-8">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-4xl font-bold mb-4">

              {name?.charAt(0)?.toUpperCase()}

            </div>

            <h2 className="text-3xl font-bold">
              {name}
            </h2>

            <span className="mt-3 px-4 py-2 rounded-full bg-blue-600 text-sm">

              {role?.toUpperCase()}

            </span>

          </div>

          {/* NAME */}

          <div className="mb-5">

            <label className="block mb-2 text-slate-400">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              readOnly
              className="w-full bg-slate-800 p-4 rounded-xl outline-none"
            />

          </div>

          {/* EMAIL */}

          <div className="mb-5">

            <label className="block mb-2 text-slate-400">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full bg-slate-800 p-4 rounded-xl outline-none"
            />

          </div>

          {/* ROLE */}

          <div className="mb-8">

            <label className="block mb-2 text-slate-400">
              Role
            </label>

            <input
              type="text"
              value={role}
              readOnly
              className="w-full bg-slate-800 p-4 rounded-xl outline-none"
            />

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 transition-all p-4 rounded-xl font-bold"
          >

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;