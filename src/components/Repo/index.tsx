import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReposProps } from "../../types/user";
import { AiOutlineFork, AiFillEye, AiFillStar } from 'react-icons/ai';
import { RiGitRepositoryCommitsFill } from 'react-icons/ri';
import classes from './Repo.module.css';
import { Load } from "../Load";


export const Repo = () => {

  const [repos, setRepos] = useState<Array<ReposProps>>([]);
  const [loader, setLoader] = useState(false);

  const { paranNameUser } = useParams();

  useEffect(() => {
    const ondataRepos = async (userName: string | undefined) => {
      try {
        setLoader(true);

        const res = await fetch(`https://api.github.com/users/${userName}/repos`);
        const data = await res.json();

        setRepos([...data]);
        setLoader(false);

      } catch (e) {
        console.log(`Error ${e}`);
      }
    }
    
    ondataRepos(paranNameUser);
    
  }, []);


  return (
      <div className={classes.better_repo}>
        {loader && <Load />}
        
        {repos.map((element) => (
          <div className={classes.repo} key={element.name}>
            <h2>
              <RiGitRepositoryCommitsFill />
              {element.name}</h2>
            <p>{element.full_name}</p>
            <div className={classes.icons}>
              <p>
                <AiOutlineFork />
                {element.forks}</p>
              <p>
                <AiFillStar />
                {element.stargazers_count}</p>
              <p>
                <AiFillEye />
                {element.watchers}</p>
            </div>
              <span>{element.visibility}</span>
          </div>
        ))}
      </div>
  )
}
