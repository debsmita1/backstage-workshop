# Tech docs ([Backstage TechDocs guide](https://backstage.io/docs/features/techdocs/getting-started))

## Prerequisites

1. [pip3](https://www.activestate.com/resources/quick-reads/how-to-install-and-use-pip3/)


### Enable TechDocs in your local instance

1. Run the following command to install `mkdocs-techdocs-core` package

    ```
    pip3 install mkdocs-techdocs-core
    ```

2. Make the following change in the `app-config.yaml` and restart the app

    ```yaml app-config.yaml
      techdocs:
        builder: "local" # Alternatives - 'external'
        generator:
          runIn: "local" # Alternatives - 'local'
        publisher:
          type: "local" # Alternatives - 'googleGcs' or 'awsS3'. Read documentation for using alternatives.
    ```


### Enable documentation in an existing entity

1. Create `mkdocs.yml` file in the root of your repository and add the following content:


    ```
    site_name: 'app1-docs'
    repo_url: https://github.com/debsmita1/app-1
    edit_uri: edit/master/docs

    nav:
      - Home: index.md
      - Guide:
        - Installation: app/install.md

    plugins:
      - techdocs-core
    ```

2. Update your component's entity object with the following:


    ```title=catalog-info.yaml
    metadata:
      annotations:
        backstage.io/techdocs-ref: dir:.
    ```

3. Create `docs` folder in the root of your repo and create `index.md` file in it with the following content:

    ```
    This is the basic documentation for the app.
    ```

4. Refresh your entity to load the documentation in the entity's TechDocs site.


