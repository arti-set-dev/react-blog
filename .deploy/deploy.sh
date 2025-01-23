cd ~/react-blog
npm run build:prod

rm -rf ~/../var/www/react_blog/html
mv ~/react-blog/build ~/../var/www/react_blog/html