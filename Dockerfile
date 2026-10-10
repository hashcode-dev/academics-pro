# Production Dockerfile for Academics Pro Next.js Frontend
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Add non-root system user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application and required assets
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

COPY .next ./.next
COPY public ./public
COPY next.config.mjs ./

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["npm", "run", "start", "--", "-p", "3000"]
