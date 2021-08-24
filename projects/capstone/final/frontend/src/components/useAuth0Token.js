import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuth0Token = () => {
  const [token, setToken] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!user?.sub || !getAccessTokenSilently) return;
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token || undefined);
        return token;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    };
    getToken();
  }, [getAccessTokenSilently, user]);

  return token;
};
export default useAuth0Token;
