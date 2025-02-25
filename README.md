<p align="center">
    <img src="https://readme-typing-svg.demolab.com?font=Source+Code+Pro&weight=900&size=32&duration=4000&pause=500&color=F0C38E&background=181b28&center=true&vCenter=true&width=900&height=200&lines=JobSuccess+Platform;Job+Application+Management;CI/CD+with+Jenkins+and+Kubernetes" alt="Typing SVG" />
</p>

<details open> 
  <summary><h2>📚 About The Project</h2></summary>
<p align="left">
The **JobSuccess Platform** is a full-stack job application platform designed to help candidates and recruiters manage job listings, applications, and resumes seamlessly. Built with modern technologies such as **Firebase**, **Express**, **React**, **Jenkins**, **Kubernetes**, and deployed on **AWS EC2**, this platform allows users to apply for jobs, post job listings, and utilize AI-powered resume analysis tools.

**Key Features**:
- **For Candidates**: 
  - Browse job listings, apply for jobs, and track application status.
  - Integrate Google Authentication for easy sign-up and login.
  - Upload resumes with file storage powered by **AWS S3**.
  - Get resume insights via **Gemini API** for automatic resume analysis.
- **For Recruiters**:
  - Post and manage job listings.
  - Track job applications, review resumes, and shortlist candidates.

The platform is designed to streamline the hiring process with a smooth user interface and robust backend.

💻 **Technologies Used**:
- **Frontend**: React.js
- **Backend**: Express.js, Firebase
- **Authentication**: Google Auth
- **File Storage**: AWS S3
- **CI/CD**: Jenkins, Kubernetes
- **Cloud Hosting**: AWS EC2
- **APIs**: Gemini API (for resume analysis)

</p>
<!-- </details> -->

#

<details open> 
  <summary><h2>🔧 Tech Stack</h2></summary>

<div align="left">
  <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
  <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/> 
  <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img alt="ReactJS" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="ExpressJS" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img alt="AWS" src="https://img.shields.io/badge/AWS-%234ea94b.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-%234ea94b.svg?style=for-the-badge&logo=firebase&logoColor=white"/>
  <img alt="Jenkins" src="https://img.shields.io/badge/Jenkins-%234ea94b.svg?style=for-the-badge&logo=jenkins&logoColor=white"/>
  <img alt="Kubernetes" src="https://img.shields.io/badge/Kubernetes-%234ea94b.svg?style=for-the-badge&logo=kubernetes&logoColor=white"/>
  <img alt="Gemini API" src="https://img.shields.io/badge/Gemini-API-%234ea94b.svg?style=for-the-badge&logo=api&logoColor=white"/>
</div>

</details>

#

<details open> 
  <summary><h2>🎨 Features</h2></summary>

- **For Candidates**:
  - Sign up and log in using **Google Auth** for easy authentication.
  - Browse and apply for job listings.
  - Upload resumes directly to **AWS S3** for file storage.
  - Get automatic resume feedback using the **Gemini API**.

- **For Recruiters**:
  - Post job listings and manage available positions.
  - View applications for posted jobs, review resumes, and make decisions.
  - Manage candidates by tracking their application status.

- **Backend and Deployment**:
  - Continuous integration and deployment with **Jenkins** and **Kubernetes** for automated testing and deployment.
  - Cloud hosting on **AWS EC2** for scalable and reliable performance.

</details>

#

<details open> 
  <summary><h2>🏗️ Architecture</h2></summary>

The **JobSuccess Platform** architecture is built to be scalable and flexible, leveraging the following components:

- **Frontend (React.js)**: A dynamic single-page application (SPA) allowing candidates and recruiters to interact with the platform.
- **Backend (Express.js & Firebase)**: Handles authentication, API requests, job listings, and user data storage.
- **File Storage (AWS S3)**: Secure storage of resumes uploaded by candidates.
- **Resume Analysis (Gemini API)**: An API integration that provides insights into resumes submitted by candidates, helping recruiters make better hiring decisions.
- **CI/CD Pipeline (Jenkins & Kubernetes)**: Automates the testing, deployment, and scaling processes, ensuring a smooth development lifecycle and continuous delivery to **AWS EC2**.

</details>

#

<details open> 
  <summary><h2>⚙️ Installation Steps</h2></summary>

To run this project locally, follow these steps:

### Prerequisites:
1. **Node.js** and **npm** installed.
2. **AWS S3** setup for resume file storage.
3. **Google API credentials** for authentication.
4. **Gemini API** access for resume analysis.
5. **Jenkins** and **Kubernetes** setup for CI/CD pipeline.

### Steps to Run:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/job-success-platform.git
    cd job-success-platform
    ```

2. **Install Backend Dependencies**:
    Navigate to the backend folder and install dependencies:
    ```bash
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies**:
    Navigate to the frontend folder and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

4. **Set Up Environment Variables**:
    - Create a `.env` file in the **backend** folder and add the following environment variables:
      ```bash
      GOOGLE_API_KEY=your_google_api_key
      AWS_ACCESS_KEY_ID=your_aws_access_key_id
      AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
      GEMINI_API_KEY=your_gemini_api_key
      ```

5. **Run the Application**:
    - Start the backend server:
      ```bash
      npm start
      ```
    - Start the frontend application:
      ```bash
      cd frontend
      npm start
      ```

6. **Access the App**:
    Open your browser and go to `http://localhost:3000` to access the app.

</details>

#

<details open> 
  <summary><h2>🌐 Live Demo</h2></summary>

Check out the live version of the **JobSuccess Platform**:

[JobSuccess Platform - Live Demo](#)

</details>

#

<details open> 
  <summary><h2>📸 Screenshots</h2></summary>

Here are some screenshots of the platform:

![Homepage](https://via.placeholder.com/600x400.png?text=Homepage)
![Job Listings](https://via.placeholder.com/600x400.png?text=Job+Listings)
![Resume Analysis](https://via.placeholder.com/600x400.png?text=Resume+Analysis)

</details>

#

<details open> 
  <summary><h2>🔮 Future Improvements</h2></summary>

- **Job Recommendation System** based on user profiles and preferences.
- **Real-time Notifications** for candidates and recruiters regarding application status.
- **Advanced Analytics** for recruiters, including detailed reports on candidates' resumes and application trends.

</details>

#

<details open> 
  <summary><h2>📬 Contact</h2></summary>
Feel free to reach out for any inquiries or suggestions related to the project!

**LinkedIn**: [Your Name](https://www.linkedin.com/in/your-username)

</details>
