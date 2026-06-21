# Grace EDS XWalk

Grace site implementation for Adobe Experience Manager Edge Delivery Services with AEM authoring and Universal Editor.

## Environments

- Preview: `https://main--grace-eds-ue-xwalk--syncpoint-digital.aem.page/`
- Live: `https://main--grace-eds-ue-xwalk--syncpoint-digital.aem.live/`

Universal Editor authoring is connected to:

- AEM author: `https://author-p144686-e1553198.adobeaemcloud.com/ui#/aem/sites.html/content/grace-eds-ue-xwalk`
- Git remote should be configured as `git@github.com:Syncpoint-Digital/grace-eds-ue-xwalk.git`

## Development

```sh
npm install
npm run build:json
npm run lint
npx @adobe/aem-cli up --port 3000
```

## Content Migration

Universal Editor block models are defined through `blocks/grace-models/_grace.json` and generated into:

- `component-definition.json`
- `component-models.json`
- `component-filters.json`

The Grace visual system is ported from `grace-payload` into `styles/grace-payload.css`, with EDS-specific overrides in `styles/styles.css`.

Use `content-seeds/grace-pages.json` as the Universal Editor authoring/import checklist for the known Payload page set.
