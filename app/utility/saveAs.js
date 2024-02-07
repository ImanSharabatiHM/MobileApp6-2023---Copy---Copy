import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { StorageAccessFramework } from 'expo-file-system';
import { name } from "dayjs/locale/ar";


function getFileUri(name) {
 
  return FileSystem.documentDirectory + `${encodeURI(name)}.pdf`;
}

export async function generatePdf(data, filename,download=true) {
 
  const fileUri = getFileUri(filename);
  await FileSystem.writeAsStringAsync(fileUri, data, 
    {encoding: FileSystem.EncodingType.Base64,
  });
  console.log(fileUri);
  
  
  if(!download)
   Sharing.shareAsync(fileUri);
   else
   {console.log("ddd");
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, 'application/pdf')
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
            alert('تم الحفظ!  ')
          })
          .catch((e) => {
          });
      } catch (e) {
        throw new Error(e);
      }

    } catch (err) {
    }

   }
}


