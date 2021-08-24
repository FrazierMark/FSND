
import React, { useEffect, useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
    
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "m-mark-frazier.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);
    

    return (
        isAuthenticated && (
          <Auth0Provider>
            <div>
              
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <h3>User Metadata</h3>
              {userMetadata ? (
                <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
              ) : (
                "No user metadata defined"
              )}
            </div>
        </Auth0Provider>
        )
    );
};

export default Profile;