FROM node:14.16.1-alpine3.10

ENV CODE /usr/src/eldorado

RUN mkdir -p ${CODE}
WORKDIR ${CODE}

COPY . ${CODE}

RUN yarn

CMD ["yarn", "start"]

EXPOSE 1234
