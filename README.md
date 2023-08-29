# Quality Install Tool

## An outline of the App startup process
1. The server will serve the built (by webpack) version of `index.html` for any route.
2. `index.html` will load `index.css` and `App.css`.
3. `index.html` will load `App.js` and will place our top-level
React component, `<App />`, on the page.
4. `App.tsx` defines the routes used by React Router.
5. The routes of the form `/app/<database name>/:docId` use the `MdxTemplateView` component to render the templates from `src/templates` and connect them to the database. `src/templates/templates_config.ts` provides a mapping from database name to the template `title` and the template as a React component.

## Installing dependencies
When installing dependencies, using `yarn install --frozen-lock` is prefered over `yarn install` to ensure that the install does not update any packages and cause dependency issues.

## Development server
The `yarn run start` command launches a server on localhost:3000. The browser view will automatically update whenever any file within the `src` folder is modified and saved. 

You must rerun `yarn run start` in order to see the effect of any changes made to files outside of the `src` folder. This comes up if you make configuration changes in `config` or you change the resources in `public`.

## Serving the production build
The `yarn run build` command generates a production build that is stored in the  
`/build` folder. This can be served as a static web site.

Use `npx http-server-spa ./build` from the top-level project folder
to serve the static files locally at `localhost:8080`. This
serves `/build/index.html` for all routes (those without file extensions) and the 
files within `./build/public/` for all other paths.

## linting and formatting
The `yarn lint` command runs a linter to ensure all code is to the formatting standards for the repo before
a pull request is made.

The command `yarn lint:fix` can be used to automatically fix any linting or formatting errors that can be fixed.


## Creating a New Workflow Template

Here's a step-by-step walkthrough on creating a new workflow template:


### Configuration File:

To add a new template, make use of the **src/templates/templates_config.ts** file. Follow these steps:

**Import a Template:**
```typescript
import DOEWorkflowHPWHTemplate from './doe_workflow_hpwh.mdx'
// other imports
```

**Define a Template:**
In the configuration file, create an entry for the new template. Specify its name, title, and reference the imported template file. 

```typescript
template_name: {
  title: 'TITLE OF THE TEMPLATE',
  template: 'IMPORTED TEMPLATE FILE',
}

// For example:
doe_workflow_hpwh: {
  title: 'Heat Pump Water Heater',
  template: DOEWorkflowHPWHTemplate,
}
```

### Generating a MDX template:

This process involves a combination of Markdown content and reusable React components, leading to the creation of dynamic and adaptable reports.

In this codebase, reports are generated by utilizing the 'Tabs' and 'Tab' components to create a tabbed interface. For example:

```HTML
---
EXAMPLE MDX
---

<Tabs>
  <!-- Input Components: Project and installation details -->
  <Tab eventKey="KEY" title="Project">
    RELATED_CONTENT
    <ProjectInfoInputs {...props} />    
  </Tab>
  <Tab eventKey="KEY" title="Assessment">
    ## HEADING
    RELATED_CONTENT
  </Tab>
  .
  .
  .
  <!-- Report Components: Components to generate the PDF report -->
  <Tab eventKey="KEY" title="Report">
    <PrintSection>
    CONTENT_TO_INLCUDE_IN_PDF_REPORT
    </PrintSection>
  </Tab>
</Tabs>
```

## Short codes for the MDX templates 

To avoid the template writter needing to import React components, a set of 
components are automatically imported into the templates as *MDX shortcodes*.
This happens in the `MdxWrapper` component.

### Input Components:

### Collapse
Wrap content to be shown/hidden
```HTML
<Collapse header="HEADER">
  CONTENT_TO_BE_SHOWN_OR_HIDDEN
</Collapse>
```

### DateInput
A calendar date input
```HTML
<DateInput label="INPUT_LABEL" path="DOCUMENT_PATH" />
```

### Figure
```HTML
<Figure src="IMAGE_SRC">
  FIGURE_CAPTION
</Figure>
```

### NumberInput
```HTML
<NumberInput label="INPUT_LABEL" prefix="INPUT_PREFIX" suffix="INPUT_SUFFIX" hint="HINT" />
```

### PhotoInput
```
<PhotoInput id="ATTACHMENT_ID" label="PHOTO_LABEL" uploadable>
  PHOTO_DESCRIPTION
</PhotoInput>
```

### Select
```HTML
<Select label="INPUT_LABEL" options={["OPTION_1", "OPTION_2"]} path="DOCUMENT_PATH" />
```

### StringInput
```HTML
<StringInput label="INPUT_LABEL" path="DOCUMENT_PATH" hint="HINT" />
```

### TextInput
```HTML
<TextInput label="INPUT_LABEL" path="DOCUMENT_PATH" />
```

### USStateSelect
A select input with the 50 U.S. States preloaded as options
```HTML
<USStateSelect label="INPUT_LABEL" path="DOCUMENT_PATH" />
```

### FileInput
```HTML
<FileInput id="ATTACHMENT_ID" label="FILE_INPUT_LABEL">
  PRINTABLE_CONTENT
</FileInput>
```

### ProjectInfoInputs
Wraps inputs components to capture information about the project site and inspecting company details in a document

```HTML
<ProjectInfoInputs {...props} />
```

### Report Components:

### PrintSection
```HTML
<PrintSection label="PRINT_BUTTON_TEXT">
  PRINTABLE_CONTENT
</PrintSection>
```

### Photo
```HTML
<Photo id="ATTACHMENT_ID" label="PHOTO_LABEL" required>
  PHOTO_DESCRIPTION
</Photo>
```

### PDFRenderer

```HTML
<PDFRenderer id="ATTACHMENT_ID" label="FILE_LABEL" />
```
