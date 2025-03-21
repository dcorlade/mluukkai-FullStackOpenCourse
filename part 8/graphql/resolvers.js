const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (!args.author && !args.genre) {
          return Book.find({}).populate('author')
        }
  
        let filter = {}
  
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (!author) {
            return []
          }
          filter.author = author._id
        }
  
        if (args.genre) {
          filter.genres = { $in: [args.genre] }
        }
        return Book.find(filter).populate('author')
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      bookCount: () => 0
    },
    Mutation: {
      addBook: async (root, args) => {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        }
  
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id, 
          genres: args.genres
        })
    
        try {
          await book.save()
          console.log('saving book: ', book)
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        await book.populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
        
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({name: args.name})
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving birth year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error
            }
          })
        }
      },
      createUser: async (root, args) => {
        const user = new User({ 
          username: args.username, 
          favoriteGenre: args.favoriteGenre
        })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          favoriteGenre: user.favoriteGenre,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers