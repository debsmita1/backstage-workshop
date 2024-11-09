# Software Templates ([Backstage Software Templates guide](https://backstage.io/docs/features/software-templates/))

1. Configure `Github` integration in your `app-config.yaml`

2. Click on `Create` to list all the Software Templates configured in your Backstage instance.

### Try Example NodeJs Software Template

1. Select the `Example Node.js Template`.

2. When you hit `Create` the `publish:github` action will fail because this template uses `publish:github` action which is not configured in your backstage instance yet.

  Note: The actions registered in Backstage can be viewed under `/create/actions`
  The Built-in actions can be found (here)[https://backstage.io/docs/features/software-templates/builtin-actions] 

3. Add the below script to configure the action in your instance:

    3.1 Execute the following from `packages/backend` path:
  
    ```yarn add @backstage/plugin-scaffolder-backend-module-github```
  
    3.2 Add the following in `packages/backend/src/index.js`
  
    ```backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));```

4. Restart your application.


### Add more templates

1. To add more templates in the catalog, add the following in the `app-config.yaml` under `catalog.locations` and re-start the app

    ```
    catalog:
      ...
      locations:
        ...
        - type: url
          target: https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend/sample-templates/remote-templates.yaml
          rules:
            - allow: [Template]
    ```


### Create your own Software Template

1. Click on the Template (editor)[https://demo.backstage.io/create/template-form] to start building your own Software Template.

    1.1 Use the default template

    1.2 Use the (scaffolder-annotator-action)[https://github.com/janus-idp/backstage-plugins/tree/main/plugins/scaffolder-annotator-action] to annotate your entity object with current timestamp:
   

      1.2.1 Install the annotator action

      ```
      yarn workspace backend add @janus-idp/backstage-scaffolder-backend-module-annotator
      ```
  
      1.2.2 Add the following in your `packages/backend/src/index.ts` file to configure the annotator action:
   

      ```
        const backend = createBackend();

        // highlight-add-start
        backend.add(import('@janus-idp/backstage-scaffolder-backend-module-annotator'));
        // highlight-add-end

        backend.start();
      ```

      1.2.3 Restart your app and verify the added action under `create/actions`.

      1.2.4 Add the following in your template yaml under `steps` after `Fetch Skeleton + Template`:
   
 
      ```
          steps:
          ...
          # this step is an example of using the `catalog:timestamping` action
          - id: timestamp
            name: Add Timestamp to catalog-info.yaml
            action: catalog:timestamping
      ```

    1.3 Add the `github:publish` action to publish the component skeleton in your desired repository
   

    ```
    - id: publish
      name: Publish the component in a new repository
      action: publish:github
      input:
        allowedHosts: ["github.com"]
        description: This is ${{ parameters.name }}
        repoUrl: ${{ parameters.repoUrl }}
    ```

    1.4 Add the `catalog:register` action to register your component in the catalog
   

    ```
    - id: register
      name: Register
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
        catalogInfoPath: "/catalog-info.yaml"
    ```

    1.5 Add the output links
   

    ```
    output:
      links:
        - title: Repository
          url: ${{ steps.publish.output.remoteUrl }}
        - title: Open in catalog
          icon: catalog
          entityRef: ${{ steps.register.output.entityRef }}
    ```

    1.5 Create a yaml file with the name `nodejs-template.yaml` under `examples/template` and add the following content:

    ```
    apiVersion: scaffolder.backstage.io/v1beta3
    kind: Template
    metadata:
      name: My-nodejs-template
      title: Node.js Template
      description: A template for the scaffolder that creates a simple Node.js service
    spec:
      owner: user:guest
      type: service
      parameters:
        ....
    ```

    1.6 Update the Fetch Base `input.url` to 

    ```
    input:
        url: ./content
    ```


3. Add the location of your template YAML in your `catalog.locations`. Restart the app to view the newly added software template in your catalog.
