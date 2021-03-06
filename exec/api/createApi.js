/**
 *
 * Terminal Function to create Collection Api
 *
 */



const { exec }  = require('child_process')

const createApi = (apiName, isMedia)=>{
  if(!apiName){
    console.error("Please provide the name for the new Collection. Such as:");
    console.info("$ API_NAME=books npm run createApi");
    return    
  }

  const collName = apiName
  console.log("********************");
  console.log(`Creating Collection in imports/api/collections/${collName}`);
  const capitalizedCollName =  collName.charAt(0).toUpperCase() + collName.slice(1);
  let command

  if(isMedia){
    command = `cp -r exec/api/templateMedia imports/api/collections/${collName};
      find imports/api/collections/${collName}/ -type f -exec sed -i 's/templatesMedia/${collName}/g' {} +;
      find imports/api/collections/${collName}/ -type f -exec sed -i 's/TemplatesMedia/${capitalizedCollName}/g' {} +;
      echo "import '../collections/${collName}/server'" >> imports/api/server/collections.js
    `
  } else {
    command = `cp -r exec/api/template imports/api/collections/${collName};
      find imports/api/collections/${collName}/ -type f -exec sed -i 's/templates/${collName}/g' {} +;
      find imports/api/collections/${collName}/ -type f -exec sed -i 's/Templates/${capitalizedCollName}/g' {} +;
      echo "import '../collections/${collName}/server'" >> imports/api/server/collections.js
    `
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`Collection ${collName} created Successfully`);
    console.log("********************");
  });
}

const apiName = process.env.API_NAME || process.env.MEDIA_API_NAME
const isMedia = !!process.env.MEDIA_API_NAME

createApi(apiName, isMedia)

