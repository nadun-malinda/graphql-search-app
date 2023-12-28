export const GET_REPOSITORIES = `
    query GetRepositories($query:String!) {
        search(query: $query, first: 20, type:REPOSITORY){
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
                        stargazers(first: 10) {
                            totalCount
                            nodes {
                                id
                                name
                                avatarUrl
                            }
                        }
                
                    }
                }
            }
        }
    }
`;

export const GET_REPOSITORY = `
    query GeRepository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            id
            name
            owner {
                id
                login
                avatarUrl
            }
            stargazers(first: 10) {
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
