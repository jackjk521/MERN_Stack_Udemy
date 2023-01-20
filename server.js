
// Connect to mongo database
// const connectDB = require('./config/mongoDb')
// connectDB()
 
// APP configuration
const app = require('./config/app');

// ROUTES
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

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

// ROUTES
// app.use('/api', sampleRoutes);

// Testing routes
// app.get('/', (req, res) => res.send('API running'));

// Testing if it can get data from db
app.get('/', (req, res) => {
    const query = " SELECT * FROM EMPLOYEE_INFO "
    connectMySql.query(query, (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
