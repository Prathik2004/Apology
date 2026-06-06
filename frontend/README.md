# Apology Website Frontend

A beautiful, romantic React + Vite frontend for the premium apology website.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Building

```bash
npm run build
```

## Features

- 3D scenes with Three.js and React Three Fiber
- Smooth animations with Framer Motion and GSAP
- Interactive memory timeline and galaxy
- Photo album with masonry layout
- Video memories player
- Animated statistics counters
- Glassmorphism design
- Fully responsive layout
- Smooth scrolling with Lenis
- Typewriter effects
- Particle animations
- Music player

## Key Components

- **Landing** - Opening experience with glowing heart
- **ApologyLetter** - Animated apology with typewriter effect
- **MemoryTimeline** - Scrollable memory cards
- **MemoryGalaxy** - 3D interactive memory space
- **LoveStatistics** - Animated counters
- **WhyILoveYou** - Flipping cards
- **PhotoAlbum** - Masonry gallery
- **VideoMemories** - Video player section
- **FuturePromises** - Floating promise cards
- **InteractiveChoice** - Main CTA section
- **SecretSurprise** - Hidden easter egg
- **FinalScene** - Emotional closing with stars

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```
To enable uploads using Cloudinary create these env variables in `.env`:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

Notes:
- Use an unsigned upload preset for client-side uploads, or implement a signed upload endpoint on the server for increased security.
- The widget script is loaded automatically from Cloudinary when you click the upload button in the Photo Album or Video Memories sections.

To load backend-proxied Cloudinary resources, set the backend URL in `.env` and run the backend server:

```bash
VITE_API_URL=http://localhost:5000
```

Then create a copy of the frontend credentials for backend use in `backend/.env` or `backend/.env.example`:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

If you want to keep using the client-side upload widget as well, also keep:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

Security note: the backend stores the Cloudinary `API_SECRET` server-side, which is safer than exposing it in frontend environment variables.

Behavior:
- The app fetches images from `Apology/Photos` and videos from `Apology/Videos` through the backend.
- Resources are returned in deterministic alphabetical order by filename (`public_id`).

## Performance

- Lazy loading of components
- Optimized animations
- Image optimization
- Code splitting with Vite
- Smooth 60 FPS animations
