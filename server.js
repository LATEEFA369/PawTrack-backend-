const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

require('./config/database');
const express = require('express');

// Auth
const verifyToken = require('./middleware/verify-token');

// Controllers
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const postsRouter = require('./controllers/posts.js');
const DMRouter = require('./controllers/DM.js');




const app = express();
const PORT = process.env.PORT || 4100;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());




// Routes
app.use('/test-jwt', testJWTRouter); // REMOVE FOR TEST ONLY
app.use('/users', usersRouter);
app.use('/messages' , DMRouter);









// Protected Routes

app.use('/profiles', profilesRouter);
app.use('/messages' , DMRouter);
//posts
app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log('The express app is ready!');
});
