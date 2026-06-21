# Grace EDS Content Seeds

This folder maps the known `grace-payload` content into an AEM/EDS authoring checklist.

The code implementation lives in EDS blocks and Universal Editor models. Page content still needs to be created or imported in AEM because XWalk content is sourced from the configured AEM author mount in `fstab.yaml`.

Use `grace-pages.json` as the migration manifest:

- `pages` lists the known page paths from the Payload source data.
- `home.blocks` shows the homepage block sequence and starter field values.
- Repeating block rows follow the renderer convention documented in each `rowShape`.

