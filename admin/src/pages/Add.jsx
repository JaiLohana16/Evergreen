import React, { useState } from 'react'
import { assets } from "../assets/assets.js"
import axios from "axios"
import { backendUrl } from '../App.jsx'

const Add = ({token}) => {
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("Mobile")
  const [subCategory,setSubCategory]=useState("Cable")
  const [bestSeller,setBestSeller]=useState(false)
  const [colours,setColours]=useState([])
  const [done,setDone]=useState("")
  const [error,setError] =useState("")

  const validateForm = () => {
    if (!name.trim()) {
      setError("Product name is required");
      return false;
    }
    if (!description.trim()) {
      setError("Product description is required");
      return false;
    }
    if (!price.trim()) {
      setError("Product price is required");
      return false;
    }
    if (colours.length === 0) {
      setError("At least one Colour must be selected");
      return false;
    }
    if (!image1 && !image2 && !image3 && !image4) {
      setError("At least one image must be uploaded");
      return false;
    }
    return true;
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("colours", JSON.stringify(colours));
      formData.append("bestseller", bestSeller);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "api/product/add", formData,{ headers: { Authorization: `Bearer ${token}` }});
      
      if(response.data.success){
        setDone("Product Added Successfully");
        
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setColours([]);
      } else {
        setError("Product not added");
      }

      setTimeout(() => {
        setDone("");
      }, 4000);
    } catch (error) {
      console.error("Error occurred:", error);
      setError("An error occurred while adding the product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
      {error && <p className='text-red-600 text-3xl'>{error}</p>}
      {done && <p className='text-green-600 text-3xl'>{done}</p>}

      {/* Upload Images Section */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="upload" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20 cursor-pointer' src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="upload" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20 cursor-pointer' src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="upload" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20 cursor-pointer' src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="upload" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* Product Details */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Name' required className='w-full max-w-[500px] px-3 py-2 '/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='Description' required className='w-full max-w-[500px] px-3 py-2 '/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2' onChange={(e)=>setCategory(e.target.value)} value={category}>
            <option value="Mobile">Mobile</option>
            <option value="Accessories">Accessories</option>
            {/* <option value="Kids">Kids</option> */}
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Subcategory</p>
          <select className='w-full px-3 py-2' onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}>
            <option value="Cable">Cable</option>
            <option value="Handsfree">Handsfree</option>
            <option value="Charger">Charger</option>
            <option value="Airpods">Airpods</option>
            <option value="Smart Watch">Smart Watch</option>
            <option value="Power Bank">Power Bank</option>
            <option value="VIVO">VIVO</option>
            <option value="OPPO">OPPO</option>
            <option value="SAMSUNG">SAMSUNG</option>
            <option value="INFINIX">INFINIX</option>
            <option value="REALME">REALME</option>
            <option value="XIAOMI">XIAOMI</option>
            <option value="TECNO">TECNO</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='Enter Price' />
        </div>
      </div>

      {/* Colours Selection */}
      <div>
        <p className='mb-2'>Product Colours</p>
        <div className='flex gap-3'>
          {["Black", "White", "Blue","Orange","Brown","Green","Purple","Pink","Golden"].map(colour => (
            <div key={colour} onClick={() => setColours(prev => prev.includes(colour) ? prev.filter(item => item !== colour) : [...prev, colour])}>
              <p className={`${colours.includes(colour) ? "border border-black" : ""} bg-slate-200 px-3 py-1 cursor-pointer`}>{colour}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id="bestseller" onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} />
        <label className='cursor-pointer' htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className='w-28 py-3 bg-black text-white'>Add Product</button>
    </form>
  );
}

export default Add;
