# define base image
FROM node:18.18.0

# set working directory in docker container
WORKDIR /Users/albertotamezgonzalez/Developer/Hackathon23/GraphQL/API

# copy package.json and package-lock.jsoN
COPY package*.json ./

# install all dependencies
RUN npm install

# Copy local code to the container image.
COPY . .

# Build TypeScript code
RUN npm run build

# Service listens on port 4000.
EXPOSE 4000

# Run the web service on container startup
CMD [ "node", "dist/index.js" ]

