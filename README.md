# to run backend \ live production (Backend \ Live Production)
node backend\server.js 

# to run backend with hot-reload (Backend \ Development with hot-reload)
npx nodemon backend\server.js 

# to run frontend with hot-reload (Frontend \ Development with hot-reload)
npm run dev

# to run both backend and frontend with hot-reload (Backend & Frontend with hot-reload)
npx nodemon backend\server.js 
npm run dev

**browse from frontend port**

# 1. Stage changes:

git add .

# 2. Commit Changes:

git commit -m "Update message"

# 3. Push to GitHub:

git push origin main

You only need -u the first time you push a branch to set upstream.
After that, just git push origin main is enough.