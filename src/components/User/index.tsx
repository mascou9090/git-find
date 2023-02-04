import { UserProps } from "../../types/user"
import { MdLocationPin } from 'react-icons/md';
import { Link } from "react-router-dom";
import classes from './User.module.css';
import { useState } from "react";

export const User = ({ login, avatar_url, location, following, followers }: UserProps) => {

  const [requestOfRepo, setRequestOfRepo] = useState(false);

  return (
    <div className={classes.user}>
      <img src={avatar_url} alt={login} />
      <h2>{login}</h2>
      {location && (
        <p className={classes.location}>
          <MdLocationPin />
          <span>{location}</span>
        </p>
      )}
      <div className={classes.stats}>
        <div>
          <p>Seguidores</p>
          <p className={classes.number}>{followers}</p>
        </div>
        <div>Seguindo
          <p className={classes.number}>{following}</p>
        </div>
      </div>
      <Link to={`/repos/${login}`}>Ver melhores projetos</Link>
    </div>
  )
}
