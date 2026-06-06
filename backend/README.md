# Apology Website Backend

This backend provides a secure Cloudinary proxy for resource listing.

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Copy your frontend `.env` values into `backend/.env` or use `backend/.env.example`.

Example `backend/.env`:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Start the server:

```bash
npm start
```

The backend listens on `http://localhost:5000` by default.

## API

- `GET /api/cloudinary/resources?folder=Apology/Photos&resourceType=image`
- `GET /api/cloudinary/resources?folder=Apology/Videos&resourceType=video`

The backend returns Cloudinary resources sorted by `public_id`.
