export const GET_REPOSITORIES = `
    query GetRepositories($query:String!) {
        search(query: $query, first: 20, type:REPOSITORY){
        edges {
            node {
                ... on Repository {
                        id
                        name
                        nameWithOwner
                        owner {
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
            }
        }
    }
`;
