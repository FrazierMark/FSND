
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";


export default async function GetAPItoken() {
  const { getAccessTokenSilently} = useAuth0();
  try {
      const domain = "m-mark-frazier.us.auth0.com";
      const APIaccessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`, 
          scope: "read:current_user"
      });

      return {accessToken: APIaccessToken};

  } catch(e) {
      
      console.log(e)
  }
}






// export const GetAccessToken = () => {
//     const { user, isAuthenticated, getAccessTokenSilently} = useAuth0();
//     const [userMetadata, setUserMetadata] = useState(null);
  
//     console.log(getAccessTokenSilently)
//     console.log(user)
  
//     useEffect(() => {
//         const getUserMetadata = async () => {
//           const domain = "m-mark-frazier.us.auth0.com";
      
//           try {
//             const accessToken = await getAccessTokenSilently({
//               audience: `https://${domain}/api/v2/`,
//               scope: "read:current_user",
//             });
      
//             const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
//             const metadataResponse = await fetch(userDetailsByIdUrl, {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             });
      
//             const { user_metadata } = await metadataResponse.json();
      
//             setUserMetadata(user_metadata);
//           } catch (e) {
//             console.log(e.message);
//           }
//         };
      
//         getUserMetadata();
//       }, [getAccessTokenSilently, user?.sub]);


//     return (
//         accessToken);
//   };
