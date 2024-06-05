document.addEventListener("deviceready", loadContacts, false);

function loadContacts(){
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ['name'];

    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts){
    console.log(contacts);
    let code = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (contact.name && contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            code += `
            <li>
                <a href="#">
                    <img src="./img/contact.jpg" alt="photo du contact">
                    <h1>${contact.name.formatted}</h1>
                    <p>${contact.phoneNumbers[0].value}</p>
                </a>
            </li>
            `;
        }
    }
    
    contactList.innerHTML = code ;
    $(contactList).listview('refresh');
}

function handleError(error) {
    console.log(error);
}

function addContact() {
    let contact = navigator.contacts.create();

    let name = new ContactName();
    name.givenName = document.getElementById("prenom").value;
    name.familyName = document.getElementById("nom").value;
    contact.name = name;

    let phoneNumbers = [];
    let mobile = document.getElementById("numero").value;
    
    if (mobile) {
        phoneNumbers.push(new ContactField('mobile', mobile, true));
    }
    contact.phoneNumbers = phoneNumbers;
    contact.save(onSuccess, onError);
}

function onSuccess(contact) {
    alert("le contact est enregostré");
    window.history.back();
    loadContacts();
}

function onError(error) {
    alert("il est survenue un erreur " + error);
    window.history.back();
}

