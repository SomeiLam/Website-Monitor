# Website-Monitor

## Run script
```
node website_monitor.js 
```


## In constants.js
### to add a website
- add an new object to websiteList array
```
{
  id: ARRAY_LENGTH,
  name: WEBSITE_NAME,
  url: WEBSITE_URL,
  selector: ELEMENT_SELECTOR
}
```
- add a new txt file in history folder with a file name of its id

### to change checking time
- change checkingTime variable (milliseconds) 
