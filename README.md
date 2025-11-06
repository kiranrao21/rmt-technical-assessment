## Prerequisites
- Node.js 20.x  
- npm (no yarn/pnpm)  
- MongoDB
- Git

## Environment
```bash
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.example apps\web\.env
copy packages\db\.env.example packages\db\.env
```
## Setup & Run
```bash
git clone https://github.com/kiranrao21/rmt-technical-assessment.git
npm install
cd docker
docker compose -f mongo-compose.yml up -d
cd ..
npm run seed
npm run dev
