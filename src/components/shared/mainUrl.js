const mainUrl = async (url) => {
  //  const response = await fetch(`https://api.cathysjewelry.net${url}`);
   const response = await fetch(`http://10.10.20.26:3000${url}`);
  //  const response = await fetch(`http://51.21.17.89:5000${url}`);
   
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }
   
   return await response.json();
 };
 
 export default mainUrl;
 