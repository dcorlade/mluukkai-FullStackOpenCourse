import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      genres
      id
      published
      title
      author {
        name
        born
        bookCount
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      id
      title
      published
      genres
      author {
        id
        name
        born
        bookCount
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

// export const CREATE_USER = gql`
//   mutation createUser($username: String!, $favoriteGenre: !String) {
//     createUser(username: $username, favoriteGenre: $favoriteGenre) {
//       username
//       favoriteGenre
//       id
//     }
//   }
// `

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      id
      favoriteGenre
      username
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    genres
    id
    published
    title
    author {
      id
      name
      born
      bookCount
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
