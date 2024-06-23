$(document).ready(function() {
  $('#download-btn').click(function() {
    var fileUrl = $('#file-url').val();

    // Verifica se l'URL è vuoto
    if (!fileUrl) {
      $('#status-message').text('Please enter a file URL');
      return;
    }

    // Effettua il download del file
    downloadFile(fileUrl);
  });

  function downloadFile(url) {
    var format = $('#file-format').val(); // Ottieni il formato selezionato

    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    })
    .then(function(response) {
      var fileName = getUnsplashFileName(url);
      var blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Aggiungi l'estensione corretta in base al formato selezionato
      if (format === 'png') {
        fileName = changeFileExtension(fileName, 'png');
      } else if (format === 'gif') {
        fileName = changeFileExtension(fileName, 'gif');
      } else if (format === 'webp') {
        fileName = changeFileExtension(fileName, 'webp');
      } else if (format === 'svg') {
        fileName = changeFileExtension(fileName, 'svg');
      } else if (format === 'ico') {
        fileName = changeFileExtension(fileName, 'ico');
      } else {
        fileName = changeFileExtension(fileName, 'jpg');
      }
       
      // Utilizza la libreria FileSaver.js per scaricare il file
      saveAs(blob, fileName);

      // Mostra il messaggio di successo
      $('#status-message').text('File downloaded successfully');
    })
    .catch(function(error) {
      // Mostra un messaggio di errore
      $('#status-message').text('Error occurred while downloading the file');
    });
  }

  function getUnsplashFileName(url) {
    // Esempio di URL Unsplash: https://images.unsplash.com/photo-1687986018999-08d83bc4cf56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80
    var matches = url.match(/photo-(.+)\?/);
    if (matches) {
      return matches[1] + '.jpg';
    }
    return 'image.jpg';
  }
});

function changeFileExtension(filename, extension) {
  var dotIndex = filename.lastIndexOf('.');
  if (dotIndex !== -1) {
    return filename.substring(0, dotIndex) + '.' + extension;
  }
  return filename + '.' + extension;
}