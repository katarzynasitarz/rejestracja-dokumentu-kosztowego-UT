export const readUploadedFile = file => {
  const temporaryFileReader = new FileReader();

  return new Promise(resolve => {
    temporaryFileReader.onload = () => {
      let contentStream = {
        content: btoa(temporaryFileReader.result),
        contentLength: temporaryFileReader.result.length,
        mimeType: file.type,
        fileName: file.name
      };
      resolve(contentStream);
    };
    temporaryFileReader.readAsBinaryString(file);
  });
};
