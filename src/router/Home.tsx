import React, { useState } from 'react';
import { Error } from '../components/Error';
import { Load } from '../components/Load';
import { Search } from '../components/Search';
import { User } from '../components/User'
import { UserProps } from '../types/user';



export const Home = () => {

  const [user, setUser] = useState<UserProps | null>(null);
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);

  const loadUser = async (userName: string) => {

    try {
      setLoader(true);
      setErr(false);
      setUser(null);

      const res = await fetch(`https://api.github.com/users/${userName}`);
      
      if(!res.ok) {
        setErr(true);
        return;
      }
      const userData = await res.json();

      setUser({
        avatar_url: userData.avatar_url,
        login: userData.login,
        location: userData.location,
        followers: userData.followers,
        following: userData.following
      });

      setLoader(false);
      
    } catch (e) {
      console.log(`Error of the type: ${e}`);
    }

  }

  return (
    <div>
      <Search loadUser={loadUser} />
      {loader && <Load />}
      {user && <User {...user} />}
      {err && <Error />}
    </div>
  )
};
