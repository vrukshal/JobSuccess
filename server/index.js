
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const applicantRoutes = require('./routes/applicantRoutes');
// const recruiterRoutes = require('./routes/recruiterRoutes');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const cors = require('cors');

const {db, auth} = require('./config/firebase');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// connect_database.connectToMongoDB();

// Swagger setup
const options = {
  definition: {
        openapi: "3.1.0",
        info: {
          title: "JobSuccess API",
          version: "0.1.0",
          description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
            name: "LogRocket",
            url: "https://logrocket.com",
            email: "info@email.com",
          },
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
        ],
      },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
// app.use('/applicantRoutes', applicantRoutes);
// app.use('/recruiterRoutes',recruiterRoutes);
app.use('/',authRoutes);
// app.use('/jobs',jobRoutes);
app.use('/',jobRoutes);


// Start the server
const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server started on port ${port}`);
});