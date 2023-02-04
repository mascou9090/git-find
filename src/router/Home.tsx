import React, { useState } from 'react';
import { Error } from '../components/Error';
import { Search } from '../components/Search';
import { User } from '../components/User'
import { UserProps } from '../types/user';



export const Home = () => {

  const [user, setUser] = useState<UserProps | null>(null);
  const [err, setErr] = useState(false);

  const loadUser = async (userName: string) => {

    try {
      setErr(false);
      setUser(null);

      const res = await fetch(`https://api.github.com/users/${userName}`);
      const data = await res.json();

      if(res.status === 404) {
        setErr(true);
        return;
      }

      const { avatar_url, login, location, followers, following } = data;

      const userData: UserProps = {
        avatar_url, login, location, followers, following
      };

      setUser(userData);
      
    } catch (e) {
      console.log(`Error of the type: ${e}`);
    }

  }

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {err && <Error />}
    </div>
  )
};
