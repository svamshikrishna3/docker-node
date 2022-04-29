FROM --platform=linux/x86-64 node
WORKDIR /app/

COPY ./package.json .

ARG NODE_ENV="development"

RUN if [ ${NODE_ENV} = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]




