import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import ProductItem from '../components/ProductItem'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const Collection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const { products,search,showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [FilteredProducts, setFilteredProducts] = useState([])
  const [category , setCategory] =useState([])
  const [subCategory,setSubCategory]=useState([])
  const [sortType,setSortType]=useState('relavent')

  const toggleCategory=(e)=>{   
    // logic when user unchecks the option 
    if (category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item != e.target.value))
    }
    else{
      setCategory([...category,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{   
    // logic when user unchecks the option 
    if (subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item != e.target.value))
    }
    else{
      setSubCategory([...subCategory,e.target.value])
    }
  }

  function ApplyFilter() {
    let productsCpy=products.slice(0,27)
    
    if(search){productsCpy=productsCpy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))}


    if(category.length>0){productsCpy=productsCpy.filter(item=> category.includes(item.category))}
    
    //means when anyone category is clicked so we have to filter out products having the same Mens or Womens or Kids in their category section thats why category .includes men or women or kids or if array has men women both so some will match with men some with other so thats how it is working here state variable category and in products array of objects the object also has key named category

    if (subCategory.length>0) {productsCpy=productsCpy.filter(item=>subCategory.includes(item.subCategory))}

    // if no filter is applied and page loads so we have made setAllproducts products.slice() so in that way that case is also covered
    setFilteredProducts(productsCpy)
  }

  function SortbyPrize(){
    let cpyFilteredProducts=FilteredProducts.slice()

    switch(sortType){
      case'low-high':
      setFilteredProducts(cpyFilteredProducts.sort((a,b)=>(a.price-b.price)))
      break;

      case 'high-low':
        setFilteredProducts(cpyFilteredProducts.sort((a,b)=>(b.price-a.price)))
        break;

      default:
        ApplyFilter()
        break  
      } 
    }
  

  useEffect(() => {
    ApplyFilter()
  }, [category,subCategory,search,products])
  

  useEffect(()=>{
    SortbyPrize()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters */}
      <div className='min-w-60' >
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2' >FILTERS
          <img src={assets.dropdown_icon} alt="dropdown" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} onClick={() => { setShowFilter(!showFilter) }} /> 
        </p>

        {/* Category Filter */}
        <div className={`border boder-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          {/* sm se bada hoga so filter always dekhega he and uss se chita hai toh filter pe click karna padega and phir woh visible hoga otw woh block rahega always dekhega 640px se upar block hai uss se neeche hidden hai click karne pe show hoga*/}
          {/* <p className='mb-3 text-sm font-medium'>CATEGORIES</p> */}
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            
            {/* <p className='flex gap-2'>
              <input type="checkbox"  className='w-3' value={"Accessories"}  onChange={toggleCategory}/>Asseccories
            </p> */}
            {/* <p className='flex gap-2'>
              <input type="checkbox" name="" className='w-3' value={"Kids"}  onChange={toggleCategory}/>Kids
            </p> */}
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border boder-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>

          <p className='mb-3 text-sm font-medium'>Products</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Cable"} onChange={toggleSubCategory}/>Cable
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Handsfree"} onChange={toggleSubCategory}/>Handsfree
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Charger"} onChange={toggleSubCategory} />Charger
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Airpods"} onChange={toggleSubCategory} />Airpods
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Smart Watch"} onChange={toggleSubCategory} />Smart Watch
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Power Bank"} onChange={toggleSubCategory} />Power Bank
            </p>
            
          </div>
        </div>

      </div>
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ACCESSORIES"} text2={"COLLECTION"} />
          {/* Products sort */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
            <option value="relavant">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* mapping products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
          {FilteredProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection
