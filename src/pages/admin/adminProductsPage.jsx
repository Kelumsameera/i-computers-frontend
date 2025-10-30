import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);

  useEffect(
    ()=>{
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    },[]
  )

  
  // axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
  //   console.log(res.data);
  //   setProducts(res.data);
  // });
  return (
    <div className="w-full max-h full flex justify-center p-10 relative">
      <table>
        <thead >
          <tr>
            <th>Image</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Lable Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Stock</th>
            <th>Availabilty</th>

          </tr>
        </thead>
        <tbody>
          {
            products.map(
              (item, index)=>{
              
              return(
                <tr key={index}>
                <td><img src={item.images[0]} alt="" className="w-[30px] h-[30px]"/></td>
                <td>{item.productID}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.labelledPrice}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.stock}</td>
                <td>{item.isAvailable ? "in stock" : "out of stock"}</td>
              </tr>
              )
            })
          }
          {/* <tr>
            <td><img src="/logo.png" alt="" className="w-[30px] h-[30px]"/></td>
            <td>PROD001</td>
            <td>Logitech MX Master 3S</td>
            <td>2450.00</td>
            <td>2650.00</td>
            <td>Mouse</td>
            <td>Logitech</td>
            <td>MX Master 3S</td>
            <td>25</td>
            <td>in stock</td>
          </tr> */}

        </tbody>
      </table>


      <Link
        to="/admin/add-product"
       className="fixed right-[20px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text-4xl border-[2px] rounded-full hover:text-white hover:bg-accent border-accent bg-white shadow-md transition"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
