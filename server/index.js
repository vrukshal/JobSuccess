
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");

const applicantRoutes = require('./routes/applicantRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const authRoutes = require('./routes/authRoutes');
const NoteRoutes = require('./routes/notificationRoutes');

const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationsRoutes');

const {db, auth} = require('./config/firebase');

const corsOptions = {
  origin: [
    `http://${process.env.REACT_APP_API_URL}`, // Dynamic origin from environment variable
    'http://localhost:3000'                  // Allow requests from localhost:3000
  ],
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(cors(corsOptions));
// Middleware
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// connect_database.connectToMongoDB();

// Swagger setup
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Authentication API',
        version: '1.0.0',
        description: 'API for user authentication including signup, login, and Google sign-in.',
      },
    },
    apis: ['./routes/*.js'], // Path to the API docs
  };

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
// app.use('/applicantRoutes', applicantRoutes);
// app.use('/recruiterRoutes',recruiterRoutes);
app.use('/',NoteRoutes);
app.use('/',authRoutes);
app.use('/',applicantRoutes);
app.use('/',recruiterRoutes);
app.use('/',jobRoutes);
app.use('/',applicationRoutes);


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});