# rebuild frontend 
cd frontend
npm run build

# Redeploy to git hub \ Netlify
git add .
git commit -m "Redeploy to Netlify"
git push

# 3. Redeploy to GitHub Pages
npm run deploy

# access via
Netlify → open root link
https://stirring-marigold-d84605.netlify.app/

GitHub Pages → open /hello-world-react/
https://johnjun97.github.io/hello-world-react/