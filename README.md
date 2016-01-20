## Musixim

### Pandora meets social media.

Getting started.

You will need to create a file config\settings.json with the following object.

```
{
  "public": {
    "persistent_session": {
      "default_method": "persistent"
    },
    "production" : false
  },
  "spotifyKey" : <YOUR_SECRET_KEY_HERE>
}
```

Then just start meteor.

`meteor --settings config\settings.json`
