import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReposProps } from "../../types/user";


export const Repo = () => {
  
  const [repos, setRepos] = useState<Array<ReposProps> | null>([]);

  const { paranNameUser } = useParams();

 useEffect(() => {
  const ondataRepos = async (userName: string | undefined) => {
    try {
      const res = await fetch(`https://api.github.com/users/${userName}/repos`);
      const data = await res.json();

      setRepos([...data]);
      console.log("Olá" + data);

    } catch(e) {
      console.log(`Error of the type ${e}`);
    }
    ondataRepos(paranNameUser);
    console.log(paranNameUser);
  }
 },[])


  return (
    <div>
      <p>Olá</p>
      <div>
        <h2>{paranNameUser}</h2>
      </div>
    </div>
  )
}
