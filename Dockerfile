FROM node:20-slim

WORKDIR /workspace

COPY backend/package*.json ./backend/
COPY socket/package*.json ./socket/
COPY frontend/package*.json ./frontend/

RUN cd backend && npm ci --omit=dev \
  && cd ../socket && npm ci --omit=dev \
  && cd ../frontend && npm ci

COPY . .

ENV VITE_SERVER=http://localhost:8000/api/v2
ENV VITE_BACKEND_URL=http://localhost:8000/

RUN cd frontend && npm run build