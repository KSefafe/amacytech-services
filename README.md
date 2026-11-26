# AmacyTech

The [AmacyTech website](https://amacytech.web.app/) runs on Firebase Hosting. Edit the website files in `public/`. To publish an update, sign in to the Firebase CLI with a project-authorized account and run the following command from this directory.

```sh
firebase deploy --only hosting --project amacytech
```

GitHub Pages publishes `docs/` to forward the former website address to Firebase. The redirect preserves section links such as `#services` and `#contact`.
