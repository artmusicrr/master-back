docker run hello-world
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
npm install -g pm2
docker run --rm hello-world
npm install -g @nestjs/cli
exit
ll
sudo apt update && sudo apt upgrade -y
sudo apt install git -y
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc
nvm install --lts
node -v
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
newgrp docker
docker ps
git clone https://github.com/artmusicrr/master-back.git
ll
mkdir project
mv master-back/ project
ll
cd project/
ll
cd master-back/
npm i --force
docker-compose up -d
ll
cat package.json
vim package.json
npm i
docker-compose up -d
docker ps
docker-compose down 
docker-compose up -d
docker ps
ll
vim .env
docker-compose down 
docker-compose up -d
docker ps
docker logs -f 8c28d50fa3b7
npm install express
docker-compose down
npm install express
npm install @fastify/static
cd src/
ll
vim main.ts
cd ..
docker-compose up -d
docker ps
docker logs -f npm install @fastify/static
docker logs -f 65211bcddab5
npm install express
cat package.json | grep express
npm i
docker logs -f 65211bcddab5
docker-compose down
npm i
docker-compose up -d
ps
docker ps
docker logs -f 08f316a5be53
npm list express
docker-compose down
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
docker-compose down --rmi all
docker-compose up --build -d
sudo ufw allow 4001/tcp
sudo ufw reload
gcloud compute firewall-rules create allow-backend-4001     --allow=tcp:4001     --source-ranges=0.0.0.0/0     --target-tags=backend-server
netstat -tulnp | grep 4001
git pull origin master
git status
git add .
git commit -m "alteração prod"
git config --global user.email "artmusicrr"
git config --global user.email "artmusic_rr@msn.com"
git commit -m "alteração prod"
git push origin master
ll
docker -v
doker ps
sudo docker ps
sudo usermod -aG docker $USER
newgrp docker
ll
cd project/
ll
cd master-back/
git push origin master
git remote set-url origin https://<TOKEN>@github.com/artmusicrr/master-back.git
git remote set-url origin https:/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/@github.com/artmusicrr/master-back.git
git push origin master
git remote -v
git remote set-url origin https://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@github.com/artmusicrr/master-back.git
git remote -v
git push origin master
git credential reject https://github.com
git credential approve <<EOF
https://github.com
username=artmusicrr
password=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
EOF

git pull origin master
git config pull.rebase false
git pull origin master
vim package-lock.json
cd ..
rm  -rf master-back/
git clone https://github.com/artmusicrr/master-back.git
cd master-back/
npm i --force
ll
vim .env
docker-compose down --rmi all
docker-compose up -d
npm install @nestjs/common@latest @nestjs/core@latest @nestjs/serve-static@latest
npm install @nestjs/common@latest @nestjs/core@latest @nestjs/platform-express@latest @nestjs/serve-static@latest
npm install --legacy-peer-deps
rm -rf node_modules package-lock.json
npm install
npm install @nestjs/core@10.3.8 @nestjs/common@10.3.8 @nestjs/platform-express@10.3.8 --save
npm install @nestjs/core@latest @nestjs/common@latest @nestjs/platform-express@latest @nestjs/serve-static@latest --save
npm uninstall @nestjs/serve-static
npm install @nestjs/serve-static@4.2.0 --save
npm show @nestjs/serve-static versions
npm install @nestjs/serve-static@4.0.2 --save
npm i
docker ps
docker compose up -d
docker-compose up --build
sudo chown -R $(whoami) ~/project/master-back/node_modules
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm install uuid --legacy-peer-deps
npm install --save-dev @types/uuid --legacy-peer-deps
docker-compose up --build
whoami
cd ..
pwd
ll
docker ps
docker-compose up -d
docker-compose build
cd project/
cd master-back/
docker-compose build
docker-compose up -d
docker ps
docker cp /home/reg/backup.sql 495cb941b0d7:/backup.sql
docker exec -i 495cb941b0d7 pg_restore -U postgres -d store /backup.sql
docker exec -it 495cb941b0d7 psql -U postgres -d store
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 495cb941b0d7
docker logs -f d011e5a59aaa
sudo systemctl status postgresql
sudo systemctl start postgresql
vim .env
docker-compose down
docker-compose up -d
docker logs -f
docker ps
docker logs -f 89db63f6d668
vim .env
docker-compose down
docker-compose up -d
docker ps
docker logs -f 8c2e6ca69fca
listen_addresses = '*'
psql -h 35.192.82.227 -U postgres -d store
sudo systemctl restart postgresql
sudo find / -name "postgresql.conf"
ccd /var/lib/docker/volumes/master-back_postgres_data/_data
sudo nano /var/lib/docker/volumes/master-back_postgres_data/_data/postgresql.conf

sudo nano /path/to
sudo nano /var/lib/docker/volumes/master-back_postgres_data/_data/pg_hba.conf
sudo vim /var/lib/docker/volumes/master-back_postgres_data/_data/pg_hba.conf
psql -h 35.192.82.227 -U postgres -d store
sudo apt update
sudo apt install postgresql-client-common postgresql-client
psql -h 35.192.82.227 -U postgres -d store
docker ps
psql -h 35.192.82.227 -U postgres -d store -v
docker exec -it master-back-postgres-1 psql -U postgres -d store
docker exec -it master-back-postgres-1 netstat -tuln | grep 5432
psql -h 35.192.82.227 -U postgres -d store
docker logs master-back-postgres-1
docker logs -f 8c2e6ca69fca
docker-compose down
docker-compose up -d
docker logs -f 8c2e6ca69fca
docker ps
docker logs -f 99e2fb220e69
vim .env
docker network ls
docker inspect master-back-postgres-1 | grep "NetworkMode"
docker inspect master-back-backend-1 | grep "NetworkMode"
docker exec -it master-back-backend-1 sh
apt update && apt install -y postgresql-client
docker exec -it master-back-backend-1 sh
exit
