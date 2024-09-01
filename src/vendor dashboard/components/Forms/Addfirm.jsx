import React,{useState} from 'react'
import { API_URL } from '../../Data/ApiPath';

const Addfirm = () => {

  const [firmname,setfirmname] = useState("");
  const [area,setarea] = useState("");
  const [category,setcategory] = useState([]);
  const [region,setregion] = useState([]);
  const [offer,setoffer] = useState("");
  const [file,setfile] = useState(null);
  

  const handlecategorychange = (event) =>{
    const value = event.target.value;
    if(category.includes(value)){
      setcategory(category.filter((item)=> item !== value));
    }else{
      setcategory([...category,value])
    }
  }

  const handleregionchange = (event) =>{
    const value = event.target.value;
    if(region.includes(value)){
      setregion(region.filter((item)=> item !== value));
    }else{
      setregion([...region,value])
    }
  }

  const handleimageupload = (e)=>{
    const selectedimage = e.target.files[0];
    setfile(selectedimage)
  }

  const handlefirmsubmit = async (e) => {
    e.preventDefault();
    try {
      const logintoken = localStorage.getItem('loginToken');
      if(!logintoken){
        console.error("user not authenticated");
      }

      const formdata = new FormData();
      formdata.append('firmname',firmname);
      formdata.append('area',area);
      formdata.append('offer',offer);
      formdata.append('image',file);

      category.forEach((value)=>{
        formdata.append('category',value)
    });

    region.forEach((value)=>{
      formdata.append('region',value)
    });

    const response = await fetch(`${API_URL}/firm/add-firm`,{
      method:'POST',
      headers:{
        'token':`${logintoken}`
      },
      body: formdata
    });
    const data = await response.json()
    if(response.ok){
      console.log(data);
      alert("Firm added successfully");
      setfirmname("");
      setarea("");
      setcategory([]);
      setregion([]);
      setoffer("");
      setfile(null);
    }else if(data.message==="vendor can have only one firm"){
      alert('Firm exists.Only 1 firm can be added');
    }
    else{
      alert('Failed to add firm')
    }
    const firmid = data.firmId;
    const firmname = data.vendorfirmname;
    localStorage.setItem('firmId',firmid)
    localStorage.setItem('firmname',firmname)
    window.location.reload()
    } catch (error) {
      console.error("Failed to add firm",error)
    }
  }

  return (
    <div className="firmsection">
       <form className="tableform" onSubmit={handlefirmsubmit}>
        <h2>Add Firm</h2>
          <label >Firm Name</label>
          <input type="text" name='firmname' placeholder='Enter firm name' value={firmname} onChange={(e)=>setfirmname(e.target.value)} />
          <label >Area</label>
          <input type="text" name='area' placeholder='Enter area' value={area} onChange={(e)=>setarea(e.target.value)}/>
          <div className="checkinp">
            <label >Category</label>
            <div className="inputscontainer">
              <div className="checkboxcontainer">
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} onChange={handlecategorychange}  value="veg"/>
                </div>
                <div className="checkboxcontainer">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} onChange={handlecategorychange} value="non-veg"/>
              </div>
            </div>
          </div>
          <div className="checkinp">
            <label >Region</label>
            <div className="inputscontainer">
              <div className="Recheckboxcontainer">
                <label>South Indian</label>
                <input type="checkbox" checked={region.includes('south-indian')} onChange={handleregionchange} value="south-indian"/>
                </div>
                <div className="Recheckboxcontainer">
                <label>North Indian</label>
                <input type="checkbox" checked={region.includes('north-indian')} onChange={handleregionchange}  value="north-indian"/>
              </div>
              <div className="Recheckboxcontainer">
                <label>Chinese</label>
                <input type="checkbox" checked={region.includes('chinese')} onChange={handleregionchange} value="chinese"/>
              </div>
              <div className="Recheckboxcontainer">
                <label>Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')} onChange={handleregionchange} value="bakery"/>
              </div>
            </div>
          </div>
          <label >Offer</label>
          <input type="text" name='offer' placeholder='Enter offer' value={offer} onChange={(e)=>setoffer(e.target.value)}/>
          <label >Firm Image</label>
          <input type="file" onChange={handleimageupload} /><br />
          <div className="btnsubmit">
                <button type='submit'>Add firm</button>
          </div>
       </form>
    </div>
  )
}

export default Addfirm