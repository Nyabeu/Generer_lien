function ajaxPost(url, data, callback, isJson) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    if (isJson) {
        // Définit le contenu de la requête comme étant du JSON
        req.setRequestHeader("Content-Type", "application/json");
        // Transforme la donnée du format JSON vers le format texte avant l'envoi
        data = JSON.stringify(data);
    }
    req.send(data);
}

function ajaxGet(url,callback){
var req = new XMLHttpRequest();
req.open("GET", url);
req.addEventListener("load", function () {
  //console.log(req.status);
    if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
        callback(req.responseText);
    } else {
        // Affichage des informations sur l'échec du traitement de la requête
          console.log(req.status);
        console.error(req.status + " " + req.statusText+ " "+url);
    }
});
req.addEventListener("error", function () {
    // La requête n'a pas réussi à atteindre le serveur
    console.error("Erreur réseau avec l'url "+ url);
});
req.send(null);
}

