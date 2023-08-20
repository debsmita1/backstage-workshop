# Setting up Backstage locally

### Backstage Installation ([Backstage getting started guide](https://backstage.io/docs/getting-started/#create-your-backstage-app))

- Execute the following command to set-up an instance of Backstage in your local

  ```
  npx @backstage/create-app@latest
  ```

- The wizard will ask for a name of the app which will also be the name of your folder.

- Once the installation is successful navitage to your backstage folder

- Execute the following steps to start the app

  ```
  cd <backstage-folder>
  yarn dev
  ```


### Configuring PostgreSQL database ([Backstage database configuration guide](https://backstage.io/docs/tutorials/configuring-plugin-databases/))

- install pg in the backend package to install appropriate PostgreSQL database drivers

  ```
  yarn add --cwd packages/backend pg
  ```

- export the following environment variables

  ```
  export POSTGRES_HOST=<your-postgres-host-name>
  ```
  ```
  export POSTGRES_PORT=<your-postgres-port>
  ```
  ```
  export POSTGRES_USER=<your-postgres-user-name>
  ```
  ```
  export POSTGRES_PASSWORD=<your-postgres-password>
  ```


- Add the following snippet in the `app-config.local.yaml` file to configure your database

  ```
  backend:
    ...
    database:
      client: pg
      connection:
        host: ${POSTGRES_HOST}
        port: ${POSTGRES_PORT}
        user: ${POSTGRES_USER}
        password: ${POSTGRES_PASSWORD}
  ```

- Start the backstage app

  ```
  yarn dev
  ```


### Set-up GitHub Integration ([Backstage GitHub integration guide](https://backstage.io/docs/getting-started/configuration#setting-up-a-github-integration))

- Create your Personal Access Token by opening the [GitHub token creation page](https://github.com/settings/tokens/new)

- select `repo` and `workflow`

- Export your GitHub token

  ```
  export GITHUB_TOKEN=<your-github-token>
  ```

- Add the following snippet in the `app-config.local.yaml` file

  ```
  integrations:
    ...
    github:
      - host: github.com
        token: ${GITHUB_TOKEN} # this should be the token from GitHub which will look like ghp_urtokendeinfewinfiwebfweb
  ```
