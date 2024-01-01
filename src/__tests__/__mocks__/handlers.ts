import { http, graphql, HttpResponse } from "msw";
import type {
  GitHubRepositoryResponse,
  GithubSearchResponse,
} from "@/types/repository";

const GRAPHQL_API = process.env.GITHUB_URL as string;

export const allRepositories: GithubSearchResponse = {
  search: {
    edges: [
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
          name: "react",
          nameWithOwner: "facebook/react",
          description: "The library for web and native user interfaces.",
          owner: {
            login: "facebook",
            avatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
          },
          stargazerCount: 216750,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkxMjE4MTQyMTA=",
          name: "react",
          nameWithOwner: "primer/react",
          description:
            "An implementation of GitHub's Primer Design System using React",
          owner: {
            login: "primer",
            avatarUrl: "https://avatars.githubusercontent.com/u/7143434?v=4",
          },
          stargazerCount: 2813,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkzMzI2NjUxMTk=",
          name: "React",
          nameWithOwner: "xzlaptt/React",
          description: "React学习",
          owner: {
            login: "xzlaptt",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/42329463?u=514bdea74cdabb0b6a9c5d37bfa8ed533cee358f&v=4",
          },
          stargazerCount: 379,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkxMTU1MjM4ODg=",
          name: "react",
          nameWithOwner: "omergulcicek/react",
          description: "🌀 React kütüphanesinin Türkçe çevirisi",
          owner: {
            login: "omergulcicek",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/13813170?u=96779dde9bbb30fa4dcababcd362d6b0a385b4f7&v=4",
          },
          stargazerCount: 515,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnk2MzUzNzI0OQ==",
          name: "create-react-app",
          nameWithOwner: "facebook/create-react-app",
          description: "Set up a modern web app by running one command.",
          owner: {
            login: "facebook",
            avatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
          },
          stargazerCount: 101322,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkyODA2MDg1OTE=",
          name: "react",
          nameWithOwner: "phosphor-icons/react",
          description: "A flexible icon family for React",
          owner: {
            login: "phosphor-icons",
            avatarUrl: "https://avatars.githubusercontent.com/u/69737287?v=4",
          },
          stargazerCount: 856,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnk1MzIzNzc0OA==",
          name: "reactjs101",
          nameWithOwner: "kdchang/reactjs101",
          description:
            "從零開始學 ReactJS（ReactJS 101）是一本希望讓初學者一看就懂的 React 中文入門教學書，由淺入深學習 ReactJS 生態系 (Flux, Redux, React Router, ImmutableJS, React Native, Relay/GraphQL etc.)。",
          owner: {
            login: "kdchang",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/2097473?u=8d4ae46ebc3d1c86668e44cbf42510cc047dfbbb&v=4",
          },
          stargazerCount: 4254,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnk1NTA1MjU3MA==",
          name: "React",
          nameWithOwner: "VolmitSoftware/React",
          description: "Smart Server Performance",
          owner: {
            login: "VolmitSoftware",
            avatarUrl: "https://avatars.githubusercontent.com/u/34003941?v=4",
          },
          stargazerCount: 92,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkyNjcwNDYzOQ==",
          name: "react-slick",
          nameWithOwner: "akiran/react-slick",
          description: "React carousel component ",
          owner: {
            login: "akiran",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/3403295?u=d02a2275b0e4585cae09845295429c2e48ab9879&v=4",
          },
          stargazerCount: 11372,
        },
      },
      {
        node: {
          id: "MDEwOlJlcG9zaXRvcnkxODg0MDAwMw==",
          name: "react-starter-kit",
          nameWithOwner: "kriasoft/react-starter-kit",
          description:
            "The web's most popular Jamstack front-end template (boilerplate) for building web applications with React",
          owner: {
            login: "kriasoft",
            avatarUrl: "https://avatars.githubusercontent.com/u/773036?v=4",
          },
          stargazerCount: 22338,
        },
      },
    ],
  },
};

export const singleRepository: GitHubRepositoryResponse = {
  repository: {
    id: "MDEwOlJlcG9zaXRvcnk3MjYyODI4NQ==",
    name: "react",
    description: "京东首页构建",
    owner: {
      id: "MDQ6VXNlcjIwNjUzNjQz",
      login: "Cathy0807",
      avatarUrl:
        "https://avatars.githubusercontent.com/u/20653643?u=25c772040b14adced5ffda8f0dc8598efd11fe0e&v=4",
    },
    stargazers: {
      totalCount: 835,
      nodes: [
        {
          id: "MDQ6VXNlcjI0ODY4OTky",
          name: "Mauro",
          avatarUrl: "https://avatars.githubusercontent.com/u/24868992?v=4",
        },
        {
          id: "MDQ6VXNlcjE0ODQ1OTA5",
          name: null,
          avatarUrl: "https://avatars.githubusercontent.com/u/14845909?v=4",
        },
      ],
    },
  },
};

export const handlers = [
  graphql.query("GetRepositories", () => {
    return HttpResponse.json({
      data: allRepositories,
    });
  }),
  graphql.query("GeRepository", () => {
    return HttpResponse.json({
      data: singleRepository,
    });
  }),
  http.post(GRAPHQL_API, async ({ request, params }) => {
    return HttpResponse.json({
      data: allRepositories,
    });
  }),
];
