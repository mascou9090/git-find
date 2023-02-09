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


  const fetchUserProps = async (userName: string | undefined): Promise<ReposProps[]> => {
    try {
      const res = await fetch(`https://api.github.com/users/${userName}/repos`);
      return await res.json();
    } catch (err) {
      console.log(`Error ${err}`);
      throw(err);
    }
  }

  const handleFetchRepos = async (userName: string | undefined) => {
    setLoader(true);
    const dataRepos = await fetchUserProps(userName);
    setRepos([...dataRepos]);
    setLoader(false);
  }

  useEffect(() => {
    handleFetchRepos(paranNameUser)
  }, [paranNameUser]);


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
