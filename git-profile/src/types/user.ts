export type UserProps = {
  avatar_url: string;
  login: string;
  location: string;
  followers: number;
  following: number;
}

export type ReposProps = {
  name: string;
  full_name: string;
  forks: number;
  watchers: number;
  visibility: string;
  stargazers_count: number;
  default_branch: string;
}