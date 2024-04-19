const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'/public')));


mongoose.connect('mongodb+srv://imkeshav:imkeshav@cluster0.huw6pgd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Add a password field
  email: { type: String }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Get username and password from the request body

  try {
 
    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Passwords match; redirect to /main
        res.redirect('/main');
      } else {
        // Passwords do not match; handle incorrect credentials
        res.status(401).send('Invalid username or password');
      }
    } else {
      // User not found; handle incorrect credentials
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error('Error handling login:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/main', (req, res) => {
  // This is the main page that users are redirected to upon successful login
  res.render('main');
});


app.get('/login', (req, res) => {
  // This is the main page that users are redirected to upon successful login
  res.render('login');
});
app.get('/signup',(req,res)=>{
  res.render('signup')
})


app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users', { users });
  } catch (err) {
    console.error('Error finding users:', err.message);
    res.redirect('/');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post('/signup', async (req, res) => {
    // Destructure data from request body
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user in the database
      const newUser = new User({ username, email, password: password });
      await newUser.save();
  
      // Redirect to the main page or render a success message
      res.redirect('/main');
    } catch (err) {
      console.error('Error during signup:', err.message);
      res.status(500).send('Server error');
    }
  });