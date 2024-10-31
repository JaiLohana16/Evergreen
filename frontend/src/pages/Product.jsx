import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import Title from '../components/Title'
import ReviewForm from "../components/ReviewForm"
import { backendURl } from '../App'


const Products = () => {
  const { productId } = useParams()
  const { products, currency,addToCart,cartItems ,error,success} = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [colour, setColour] = useState("")
  const [image, setImage] = useState("")
  const [reviewsVisible, setReviewsVisible] = useState(false);
  

  async function getProductData() {
    products.map((item, index) => {
      if (item._id == productId) {
        setProductData(item)
        setImage(item.image[0])
        console.log(item)
        return null
      }
    })
  }

  const fetchReviews = async () => {
    try {
        const response = await fetch(backendURl+`/api/product/review/${productId}`);
        const data = await response.json();
        if (data.success) {
            setProductData(prevData => ({...prevData, reviews: data.reviews}));
          }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

  
  useEffect(() => {
    if (products.length > 0) {
      getProductData();
      fetchReviews()
    }
  }, [products, productId]);
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out-500 opacity-100 '>
      {/* Product Data */}
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col flex-row overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img onClick={() => { setImage(item) }} src={item} alt="image" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))}
          </div>
          {/* large image */}
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="imageState" className='w-full h-auto' />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex flex-col sm:w-1/2 w-full'>

          <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
{/* 
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="star" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div> */}

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price }</p>

          <p>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8 '>
            <p>Select Colour</p>
            <div className='flex gap-2'>
              {productData.colours.map((item, index) => (
                <button onClick={() => setColour(item)} className={`border py-2 px-4 bg-gray-100 ${item == colour ? 'border-orange-500' : ''}`}>{item}</button>
              ))}
            </div>
          </div>

          <button onClick={()=>addToCart(productData._id,colour)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 sm:w-1/4 w-1/2'>ADD TO CART</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

         
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex-col gap-1'>
            <p>100% Orignal Products</p>
            <p>Cash on delivery is available on this product</p>
            <p>Genuine & Quality Products</p>
          </div>
        </div>
      </div>


      {/* Review Section */}
      <div className='mt-20'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center'>
                        <p className='relative border border-gray-400 px-5 py-3 text-sm cursor-pointer sm:w-1/4 w-2/3 text-center font-bold rounded-md' onClick={() => setReviewsVisible(!reviewsVisible)}>
                            Reviews {productData.reviews ? productData.reviews.length : 0}
                        </p>
                        <img
                            src={assets.cross_icon}
                            alt="cross"
                            className={`w-4 ml-6 cursor-pointer ${reviewsVisible ? "" : "hidden"}`}
                            onClick={() => setReviewsVisible(false)}
                        />
                    </div>

                    {reviewsVisible && productData.reviews && (
                        <div className='overflow-y-scroll h-52 rounded-md p-1 border-gray-400 border sm:w-1/2'>
                            {productData.reviews.map((item, index) => (
                                <div key={index} className='flex flex-col p-3'>
                                    <div>
                                        <span className='font-bold'>Review By:</span> {item.name}
                                    </div>
                                    <div>
                                        <span className='font-bold'>Product Review:</span> {item.review}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Review Form */}
            <ReviewForm productId={productId} onReviewAdded={fetchReviews} />

          {/* Related Products Section */}

          <div className='mt-6'>
            <div className='text-center text-3xl py-2'>
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>
            </div>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} id={productData._id}/>
            
          </div>
          
    </div>
  ) : null
}

export default Products
