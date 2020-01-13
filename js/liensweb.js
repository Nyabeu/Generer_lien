/*
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

var contenuElt = document.getElementById("contenu");
for(var i = 0; i < listeLiens.length; i++){

    var myParag = document.createElement("p");
    myParag.setAttribute("class", "lien");

    var myLink = document.createElement("a");
    myLink.style.color = "#428bca";
    myLink.href = listeLiens[i].url;
    var myLinkText = document.createTextNode(listeLiens[i].titre);

    myLink.appendChild(myLinkText);
    myParag.appendChild(myLink);
    //myParag.appendChild(mySpan);

    var myUrlText = document.createTextNode(" "+listeLiens[i].url);

    myParag.appendChild(myUrlText);
    var myBr = document.createElement("br");
    myParag.appendChild(myBr);

    var mySpan = document.createElement("span");
    var myAuteurText = document.createTextNode("Ajouté par "+listeLiens[i].auteur);
    mySpan.appendChild(myAuteurText);
    myParag.appendChild(mySpan);


    contenuElt.appendChild(myParag);
}
/////////////////////SUITE DE L'ACTIVITE///////////////////////////////////////

function afficheForm(e){
  var myForm = document.createElement("form");
  myForm.setAttribute("name","form");
  // creation des champs du formulaire
  var inputTitre = document.createElement("input");
    inputTitre.setAttribute("type","text");
    inputTitre.setAttribute("name","titreIn");
    inputTitre.setAttribute("placeholder","Entrez le titre du lien");
    inputTitre.id = "titreIn";
    inputTitre.required = true;
    inputTitre.style.marginRight = "20px";
    myForm.appendChild(inputTitre);

  var inputUrl = document.createElement("input");
    inputUrl.setAttribute("type","url");
    inputUrl.setAttribute("name","urlIn");
    inputUrl.required = true;
    inputUrl.setAttribute("placeholder","Entrez l'url du lien");
    inputUrl.id = "urlIn";
    inputUrl.style.marginRight = "20px";
    myForm.appendChild(inputUrl);

  var inputAuteur = document.createElement("input");
    inputAuteur.setAttribute("type","text");
    inputAuteur.setAttribute("name","auteurIn");
    inputAuteur.required = true;
    inputAuteur.setAttribute("placeholder","Entrez l'auteur du lien");
    inputAuteur.id = "auteurIn";
    inputAuteur.style.marginRight = "20px";
    myForm.appendChild(inputAuteur);

  var buttonform = document.createElement("button");
     buttonform.textContent = "Ajouter";
     myForm.appendChild(buttonform);
     buttonform.addEventListener("click", function(e){
        //////////////// Envoyer les données au serveur /////////////
        var dataForm = {
            "titre": form.elements.titreIn.value,
            "url": form.elements.urlIn.value,
            "auteur": form.elements.auteurIn.value
        }
        ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien",dataForm,function(reponse){
            console.log(reponse);
            //dataForm = JSON.stringify(dataForm);
            var messageElt = document.createElement("p");
            messageElt.style.backgroundColor = "rgba(145,207,230,0.2)";
            messageElt.style.margin = "20px";
            messageElt.style.padding = "20px";
            messageElt.textContent = "le lien "+dataForm.titre+ " a bien été ajouté .";
            parentBody.replaceChild(messageElt,myForm);
            setTimeout(function(){messageElt.style.display = "none";}, 2000);

           parentBody.insertBefore(myButton,contenuElt);
        },true);
        ////////////////// Interroger le serveur ///////////////
        ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens", function(reponse){

            var reponses = JSON.parse(reponse);
            reponses.forEach(function(result){
                var paraForm = document.createElement("p");
                paraForm.setAttribute("class", "lien");
                var lienForm = document.createElement("a");
                lienForm.style.color = "#428bca";
                lienForm.href = result.titre;
                lienForm.textContent = result.titre;
                paraForm.appendChild(lienForm);
                var regex = /^http:\/\//;
                if(!regex.test(result.url)){
                    var urlTextForm = document.createTextNode(" http://"+result.url);
                }else{
                    var urlTextForm = document.createTextNode(" "+result.url);
                }
                paraForm.appendChild(urlTextForm);
                var brForm = document.createElement("br");
                paraForm.appendChild(brForm);
                var spanForm = document.createElement("span");
                spanForm.textContent = "Ajouté par " + result.auteur;
                paraForm.appendChild(spanForm);
                contenuElt.insertBefore(paraForm,contenuElt.childNodes[0]);

            });
        });
     });

  parentBody.replaceChild(myForm,myButton);
}
var parentBody = document.body;
var myButton = document.createElement("button");
myButton.textContent ="Ajouter un lien";
myButton.addEventListener("click", afficheForm);
parentBody.insertBefore(myButton,contenuElt);

