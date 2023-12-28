import {
  REPOSITORIES_DEFAULT_LIMIT,
  STARGAZERS_DEFAULT_LIMIT,
} from "@/constants";

export const GET_REPOSITORIES = `
    query GetRepositories($query: String!, $limit: Int = ${REPOSITORIES_DEFAULT_LIMIT}) {
        search(query: $query, first: $limit, type: REPOSITORY){
        edges {
            node {
                ... on Repository {
                        id
                        name
                        nameWithOwner
                        description
                        owner {
                            login
                            avatarUrl
                        }
                        stargazerCount
                    }
                }
            }
        }
    }
`;

export const GET_REPOSITORY = `
    query GeRepository($owner: String!, $name: String!, $stargazersLimit: Int = ${STARGAZERS_DEFAULT_LIMIT}) {
        repository(owner: $owner, name: $name) {
            id
            name
            description
            owner {
                id
                login
                avatarUrl
            }
            stargazers(first: $stargazersLimit) {
                totalCount
                nodes {
                    id
                    name
                    avatarUrl
                }
            }
        }
    }
`;
