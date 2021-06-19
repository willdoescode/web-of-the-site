FROM haskell:8

COPY . .

RUN cabal update
RUN cabal build
RUN cabal install

CMD ["server"]