# URCardboardPet

To run locally, you must disable some security settings in chrome. Open chrome from terminal with this command for development: 
```open /Applications/Google\ Chrome.app --args --allow-file-access-from-files```

App takes a parameter currently labeled 'q'. The parameter needs to be letters a - z referencing positions in the texture arrays.

## Example urls:
Menu:
``` http://urcardboard.pet?q=menu ```

Results:
``` http://urcardboard.pet?q=abcabcabc ```