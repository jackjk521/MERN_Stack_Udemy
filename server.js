
// Connect to mongo database
// const connectDB = require('./config/mongoDb')
// connectDB()
 import path from require('path')

// APP configuration
const app = require('./config/app');

// ROUTES
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// Serve static assets in production
if(!process.env.NODE_ENV === 'production'){
  // Set Static Folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// DATABASE CONNECTION
const { connectDb } = require('./config/mysqlDb');

connectDb()
  .then((connection) => {
    app.listen(process.env.LOCAL_PORT || 5000, async () => {
      console.log({
        message: `Server is running on port ${process.env.LOCAL_PORT || 5000}`,
        environment: process.env._ENVIRONMENT,
        connection: connection.message,
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
// Testing if it can get data from db
app.get('/', (req, res) => {
    const query = " SELECT * FROM EMPLOYEE_INFO "
    connectMySql.query(query, (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
