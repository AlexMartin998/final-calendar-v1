  - Production:
    - Crear el script build
      - "build": "babel src -d dist && ncp src/views dist/views && ncp src/public dist/public",
        - Como babel interpreta JS, no tom en cuenta  /public,  /views, etc. Por eso debemos copiarlos
        - ncp   <-  Copiar files \ directories

    - package.json: scripts - public/
      "build": "rimraf ./dist && babel ./src -d ./dist && ncp src/public dist/public",