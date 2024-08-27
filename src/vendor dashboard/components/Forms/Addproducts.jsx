import React,{useState} from 'react'
import { API_URL } from '../../Data/ApiPath';

const Addproducts = () => {


  const [productname,setproductname] = useState("");
  const [price,setprice] = useState("");
  const [category,setcategory] = useState([]);
  const [bestseller,setbestseller] = useState(false);
  const [description,setdescription] = useState("");
  const [image,setimage]= useState(null);

  const handlecategorychange = (e) =>{
    const value = e.target.value;
    if(category.includes(value)){
      setcategory(category.filter((item)=>item !==value));
    }else{
      setcategory([...category,value])
    }
  }

  const handlebestseller = (e)=>{
    const value = e.target.value === 'true';
    setbestseller(value)
  }

  const handleimageupload = (e)=>{
    const selectedimage = e.target.files[0];
    setimage(selectedimage)
  }


  const handleaddproduct = async(e)=>{
      e.preventDefault()
      try {
        const logintoken = localStorage.getItem('loginToken');
        const firmId = localStorage.getItem('firmId');

        if(!logintoken || !firmId){
          console.error("user not authentiacted");
        }  
        const formdata = new FormData();
        formdata.append('productname',productname);
        formdata.append('price',price);
        formdata.append('bestseller',bestseller);
        formdata.append('description',description);
        formdata.append('image',image);
        
        category.forEach((value)=>{
          formdata.append('category',value)
        });

        const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
          method:'POST',
          body:formdata
        })

        const data = await response.json();

        if(response.ok){
          alert('product added succesfully');
        }
        setproductname("");
        setprice("");
        setcategory([]);
        setbestseller(false);
        setimage(null)
        setdescription("")

      } catch (error) {
        alert('Failed to add product');
      }
  }

  return (
    <div className="firmsection">
    <form className="tableform" onSubmit={handleaddproduct}>
     <h2>Add Product</h2>
       <label >Product Name</label>
       <input type="text" placeholder='Enter product name' value={productname} onChange={(e)=> setproductname(e.target.value)} />
       <label >Price</label>
       <input type="text" placeholder='Enter price' value={price} onChange={(e)=>setprice(e.target.value)}/>
       <div className="checkinp">
            <label >Category</label>
            <div className="inputscontainer">
              <div className="checkboxcontainer">
                <label>Veg</label>
                <input type="checkbox"  value="veg" checked={category.includes('veg')} onChange={handlecategorychange}/>
                </div>
                <div className="checkboxcontainer">
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handlecategorychange}/>
              </div>
            </div>
          </div>
          <div className="checkinp">
            <label >Bestseller</label>
            <div className="inputscontainer">
              <div className="checkboxcontainer">
                <label>Yes</label>
                <input type="radio"  value="true" checked={bestseller === true} onChange={handlebestseller}/>
                </div>
                <div className="checkboxcontainer">
                <label>No</label>
                <input type="radio" value="false" checked={bestseller === false} onChange={handlebestseller}/>
              </div>
            </div>
          </div>
       <label >Description</label>
       <input type="text" placeholder='Enter Description' onChange={(e)=>setdescription(e.target.value)}/>
       <label >Product Image</label>
       <input type="file" onChange={handleimageupload}/><br />
       <div className="btnsubmit">
             <button type='submit'>Add product</button>
       </div>
    </form>
 </div>
  )
}

export default Addproducts