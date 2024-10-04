# Install packages

To install package run following command in the root of the project
make sure to use node version 18

### `npm install`

After packages are installed run following to start the project

### `npm start`

# Explanation

In this implementation, I have used the useContext hook to easily share and manage the video-related state across the component. The VideoContext provides global access to video metadata like duration, startTime, endTime, and videoSrc, as well as functions to update them (setDuration, setStartTime, etc.). This allows the VideoUploadButton component to efficiently handle video uploads, trim functionality, and metadata updates without needing to pass props manually through different layers of the component tree. The context simplifies managing and updating the video state throughout the app.

# Used:

Rectjs, Remotion, ContextAPI
