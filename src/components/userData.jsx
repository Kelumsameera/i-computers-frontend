import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserData() {
  const [user, setUser] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response)=>{
				console.log(response.data);
                setUser(response.data);
            }).catch(()=>{
                setUser(null);
            })
        }
    },[])
	const [selectedOption, setSelectedOption] = useState("user");

  return (
    <>
      {user ? (
        <div>
          <div className="w-[150px] flex flex-row">
			  <img src={user.image} referrerPolicy="no-referrer" className="w-[50px] rounded-full h-[50px]"/>
			 <select className="bg-transparent outline-none text-white ml-2 mt-4" value={selectedOption} onChange={(e) => {
				
				if(e.target.value === "logout"){
					localStorage.removeItem("token");
					window.location.href = "/login";
				}else if(e.target.value === "my-orders"){
					window.location.href = "/orders";
				}
				setSelectedOption("user");
			 }}>
				<option className="bg-accent" value={"user"}>{user.firstName}</option>
				<option className="bg-accent" value={"logout"}>Logout</option>
				<option className="bg-accent" value={"my-orders"}>My Orders</option>
				

			 </select>
		  </div>
        </div>
      ) : (
        <div>
          <Link to="/login" className="mx-2 px-4 py-2 bg-white text-accent rounded-full">Login</Link> /
            <Link to="/register" className="mx-2 px-4 py-2 bg-white text-accent rounded-full">Register</Link>
        </div>
      )}
    </>
  );
}
