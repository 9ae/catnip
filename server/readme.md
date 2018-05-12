**Get Kitty List**

* **URL:**
   /api/getKittyList
  
* **Method:**
  `GET`
  
*  **URL Params**

   **Required:**
 
   `address=[string]`
   
*  **Returns**

[{
  name: [string], 
  id: [number],
  listed: [boolean],
  siring: [boolean]
  price: [number]
}]

**Update Kitty Listing**

* **URL:**
   /api/updateKittyListing
  
* **Method:**
  `POST`
  
*  **Params**

   **Required:**
 {
   `address=[string]',
   'kittyID=[number]',
   'siring'=[boolean],
   'price'=[number]',
   'listed'=[boolean]
 ]
 
 
**Get Kitties To Display**

* **URL:**
   /api/getKittiesToDisplay
  
* **Method:**
  `GET`
  
*  **Params*
{
  kittyID = [number]
}

   **Returns:**
[{
  name: [string], 
  cattributes: [string],
  imgUrl: [string],
  price: [number]
}]

**Vote On Kitty**

* **URL:**
   /api/voteOnKitty
  
* **Method:**
  `POST`
  
*  **Params*
{
  kittyID = [number],
  likedKittyID = [number],
  liked = [boolean]
}
 
