
let debug = {mode: false};
const _root               = document.getElementById('root');
const _caseNumberInput    = document.getElementById('caseNumberInput');
const _hidden             = document.getElementById('hidden');
const _liraForm           = document.getElementById('liraForm');
const _liraInput          = document.getElementById('liraInput');
const _messageBox         = document.getElementById('messageBox');
const _userForm           = document.getElementById('userForm');

const _newDate = new Date();
const _listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 
                       'December'];                  
const _formalFullDate = 
  `${_listOfMonths[_newDate.getMonth()]} ${_newDate.getDate()}, ${_newDate.getFullYear()}`;

const _caInfo = {
  'Fake City'     : ['Mr.', 'John', 'A.', 'Doe',  '', 
                     '12345 Foo Street, 6th Floor', 
                     'FakeCity', 'Virginia', '12345'],
  
  'Main City'     : ['Mr.', 'John', 'B.', 'Smith' ,  '',
                     '321 North Fizz Street',
                     'MainCity', 'Virginia', '54321'],
};

const _prettifiedProperty = {
  'title': 'Title',
  'titleAbbrv': 'Title Abbreviation',
  'supervisor': 'Supervisor',
  'lieutenant': 'Lieutenant',
  'suffix': 'Suffix',
  'captain': 'Captain',
  'officeNumber': 'Office Phone',
  'firstName': 'First Name',
  'middleName': 'Middle Name',
  'lastName': 'Last Name',
  'race': 'Race',
  'gender': 'Gender',
  'dob': 'Date of Birth',
  'height': 'Height',
  'weight': 'Weight',
  'hair': 'Hair Color',
  'eyes': 'Eye Color',
  'SSN': 'Social Security Number',
  'streetAddress': 'Street Address',
  'city': 'City',
  'state': 'State',
  'zipCode': 'zipCode',
  'charges': 'Charges',
  'phoneNumber': 'Phone Number',
  'testimony': 'Testimony',
  'suffix:': 'Suffix'
};

/******************
*Class Definitions*
******************/

class Person {
  constructor(title, firstName, middleName, lastName, suffix, streetAddress, 
              city, state, zipCode){
    this.title         = title;
    this.firstName     = firstName; 
    this.middleName    = middleName; 
    this.lastName      = lastName; 
    this.suffix        = suffix; 
    this.streetAddress = streetAddress; 
    this.city          = city; 
    this.state         = state; 
    this.zipCode       = zipCode; 
    
  }

  get middleInitial() {
    return this.middleName.slice(0) || '';
  }

  get fullName() {
    let nameArr = [this.firstName, this.middleName, this.lastName, this.suffix];
    
    nameArr = nameArr.filter( (str) => { return str.length > 0;});
   
    return nameArr.join(' '); 
  }

}

class Investigator extends Person {
  constructor(title, titleAbbrv, firstName, middleName, lastName, suffix, supervisor, 
              lieutenant, captain, officeNumber) {

    super(title, firstName, middleName, lastName, suffix);
    this.titleAbbrv    = titleAbbrv;
    this.supervisor    = supervisor;
    this.lieutenant    = lieutenant;
    this.captain       = captain;
    this.officeNumber  = officeNumber;
    this.streetAddress = '600 Independence Parkway Suite 106B';
    this.city          = 'Chesapeake';
    this.state         = 'VA';
    this.zipCode       = '23320-5188';
  }
}

class Suspect extends Person {
  constructor(firstName, middleName, lastName, suffix, race, gender, dob, height, 
              weight, hair, eyes, SSN, streetAddress, city, state, 
              zipCode, charges) {

    super('', firstName, middleName, lastName, suffix, streetAddress, city, state, zipCode);
    this.race    = race;
    this.gender  = gender;
    this.dob     = dob;
    this.height  = height.replace(`'`, ` ft.`).replace(`"`, ` in.`);
    this.weight  = weight;
    this.hair    = hair;
    this.eyes    = eyes;
    this.SSN     = this.prettifiedSSN(SSN);
    this.charges = charges;
  }

  prettifiedSSN(rawSSN) {
    let ssnArray = [];
    let prettySSN = '';

    if (rawSSN.length === 9) {
      ssnArray = rawSSN.split('');
      ssnArray.splice(3, 0, '-');
      ssnArray.splice(6,0, '-');
      prettySSN = ssnArray.join('');      
    }
    return prettySSN || rawSSN;

  }

  get firstCharge(){
    return this.charges.split(',')[0];
  }

  get titlePageCharges() {
    return this.buildTitlePageCharges();
  }

  buildTitlePageCharges() {
    return this.charges.replace(', ', '<br><br>');
  }

  get suspectPage() {
    return this.buildSuspectPage();
  }

  buildSuspectPage() { 
    //Bind this to that for the findIndex Purposes
    let that = this;

    /*
      This method is run on the reports final print.  At this time we iterate 
      through the array of Suspects that we are keeping, find out where this
      Suspect is, add 1 to it for the page number, which is used at the bottom
      of the page
     */
    
    let pageNumber = `C`;
    
    let suspectNumber = Report.savedSuspects.findIndex(function (obj) {
      return obj === that;
    }) + 1;
    
    if (suspectNumber > 1) {
      pageNumber = `C-${suspectNumber}`;
    }
    

    return `
    <div class='page' id='suspectPage'>
      <div class='caseHeader'>File No. ${Report.caseNumber}</div>
      <div id='suspectPageTitle'>SUSPECT</div>
        
      <div class='suspectInfo'>
        ${suspectNumber}.   <span class='suspectName'> ${this.fullName}</span><br>
        <span class='suspectProperty'>Race:</span> <span class='suspectValue'>${this.race}</span><br>
        <span class='suspectProperty'>Gender:</span> <span class='suspectValue'>${this.gender}</span><br>
        <span class='suspectProperty'>Date of Birth:</span> <span class='suspectValue'>${this.dob}</span><br>
        <span class='suspectProperty'>Height:</span> <span class='suspectValue'>${this.height}</span><br>
        <span class='suspectProperty'>Weight:</span> <span class='suspectValue'>${this.weight}</span><br>
        <span class='suspectProperty'>Hair:</span> <span class='suspectValue'>${this.hair}</span><br>
        <span class='suspectProperty'>Eyes:</span> <span class='suspectValue'>${this.eyes}</span><br>
        <span class='suspectProperty'>Social Security Number:</span> <span class='suspectValue'>${this.SSN}</span><br>
        <span class='suspectProperty'>Residence:</span> <span class='suspectValue'>${this.streetAddress}</span><br><span class='suspectValue'>${this.city}, ${this.state} ${this.zipCode}</span>
      </div>
      <div class='pageNumber'>${pageNumber}</div>
    </div>
    `;
  }
}

class Witness extends Person{
  constructor(firstName, middleName, lastName, suffix, streetAddress, city, state,
              zipCode, phoneNumber, testimony) {

    super('', firstName, middleName, lastName, suffix, streetAddress, city, state,
          zipCode);
        
    this.phoneNumber = this.prettifiedPhoneNumber(phoneNumber);
    this.testimony   = testimony;

  }


  prettifiedPhoneNumber(rawPhoneNumber){
    let phoneNumberArray;
    let prettyNumber;
   
    if (rawPhoneNumber.length === 12) {
      phoneNumberArray = rawPhoneNumber.split('-');
      //555,123,4567
      prettyNumber = `(${phoneNumberArray[0]}) ${phoneNumberArray[1]}-${phoneNumberArray[2]}`;
    }
 
    return prettyNumber || rawPhoneNumber; 
  }

  get witnessInfo() {
    return this.buildWitnessInfo();
  }

  buildWitnessInfo() {
    //Bind this to that for the findIndex Purposes
    let that = this;

    /*
      This method is run on when we go to print the report.  At this time we  
      iterate through the array of Witnesses that we are keeping, find out where 
      this Witness is, add 1 to it for the witness number.  The user has already 
      deleted unwanted witnesses when this function is running.
     */
    
    let witnessNumber = Report.savedWitnesses.findIndex(function (obj) {
      return obj === that;
    }) + 1;

    return `
      <div class='witnessInfo'>
        ${witnessNumber}. <span class='witnessName'> ${this.fullName}</span><br>
        <div class='witnessDetails'><br>
            ${this.streetAddress}<br>
            ${this.city}, ${this.state} ${this.zipCode}<br>
          ${this.phoneNumber}<br>
          <div class='witnessStatement'>${this.testimony}</div>
        </div>
      </div>
      `;
  }
}

const Input = {

  confirmObject: function(inputArray, count, targetArray) {
    return new Promise((resolve, reject) => {
      
      let object = inputArray[count];
      _root.innerHTML = (`Confirm Report Screen<br><br>`);
      _root.innerHTML += 
      (`<form id='confirmObjectForm'>
          Confirm ${object.constructor.name} information <br><br>
          ${Input.printObject(object)}
          <button id="submit" type="submit">Confirm</button><button id="delete" type="delete">Delete</button>
        </form>
      `);

      const confirmObjectForm  = document.getElementById('confirmObjectForm');
      
      

      //eventListener button to assign the edited properties to the object
      document.getElementById('submit').addEventListener('click', function(event) {
        event.preventDefault();
        for (let i = 0; i < confirmObjectForm.elements.length - 1; i += 1) {
          object[confirmObjectForm.elements[i].name] = confirmObjectForm.elements[i].value;
        }
        targetArray.push(object);    
        count +=1;
        if (count < inputArray.length) {
          resolve(Input.confirmObject(inputArray, count, targetArray));
        }else{
          resolve('resolve from else');
        }
        
      });

      document.getElementById('delete').addEventListener('click', function(event) {
        event.preventDefault();
        count += 1;
        if (count < inputArray.length) {
          resolve(Input.confirmObject(inputArray, count, targetArray));
        }else{
          resolve('resolve from else');
        }
      });

    });
  },

  confirmReport: function(){
    _root.innerHTML = (`Confirm Report Screen<br><br>`);
    //Iterate over all objects in detectedSuspects, all objects in 
    //detectedWitnesses,
    //all items in evidence, all items in forms.
    
    Input.confirmObject([Report.ca], 0, [Report.savedCa])
        .then(()=>{
          Input.confirmObject(Report.detectedWitnesses, 0, Report.savedWitnesses)
              .then(()=>{
                Input.confirmObject(Report.detectedSuspects, 0, Report.savedSuspects)
                    .then(()=>{
                      Input.inputEvidence();
                    });
              });
        });
  },

  constructEvidencePages: function(items, itemNumber) {
    if (items.length === 0) {
      Report.savedEvidencePages.push(`<div class='page' id='formsPage'>
        <div class='caseHeader'>File No. ${Report.caseNumber}</div>
        <div id='formsPageTitle'>EVIDENCE</div>
          
        <div class='pageNumber'>E</div>
      </div>`);
      return 0;
    }  
    let newStartingNumber;
    let pageDigit = Report.savedEvidencePages.length + 1;
    let pageNumber = `E`;
    let restOfItems = [];
    let evidenceListDiv = document.createElement('div');
    evidenceListDiv.className = 'evidenceList';
    
    if (pageDigit > 1) {
      pageNumber = `E-${pageDigit}`;
    } 

    evidenceListDiv.id = pageNumber;

    for (let i = 0; i < items.length; i += 1) {
      let itemDiv = document.createElement('div');
      itemDiv.id = `evidence${i}`;
      itemDiv.textContent = `${i + itemNumber}. ${items[i]}`;
      
      evidenceListDiv.appendChild(itemDiv);
      evidenceListDiv.appendChild(document.createElement('br'));
      
      if (Input.testEvidenceHeight(evidenceListDiv.outerHTML, pageNumber) > 800) {
        
        let d = document.getElementById(pageNumber);
        let child = document.getElementById(itemDiv.id);
        d.removeChild(child);
        
        restOfItems = items.slice(i);
        newStartingNumber = i + itemNumber;
        break;

      }
    }
    
    Report.savedEvidencePages.push(
      `
      <div class='page' id='evidencePage'>
        <div class='caseHeader'>File No. ${Report.caseNumber}</div>
        <div id='evidencePageTitle'>EVIDENCE</div>
          ${document.getElementById(pageNumber).outerHTML}
        <div class='pageNumber'>${pageNumber}</div>
      </div>`
    );
    
    if (restOfItems.length > 0) {
      Input.constructEvidencePages(restOfItems, newStartingNumber);
    }
  },

  constructFormPages: function(items, itemNumber) {
    if (items.length === 0) {
      Report.savedFormsPages.push(`<div class='page' id='formsPage'>
        <div class='caseHeader'>File No. ${Report.caseNumber}</div>
        <div id='formsPageTitle'>REPORT FORMS</div>
          
        <div class='pageNumber'>F</div>
      </div>`);
      return 0;
    }
    console.log(`cfp, `, items, itemNumber);
    let newStartingNumber;
    let pageDigit = Report.savedFormsPages.length + 1;
    let pageNumber = `F`;
    let restOfItems = [];
    let formsListDiv = document.createElement('div');
    formsListDiv.className = 'formsList';
    
    if (pageDigit > 1) {
      pageNumber = `F-${pageDigit}`;
    } 

    formsListDiv.id = pageNumber;

    for (let i = 0; i < items.length; i += 1) {
      let itemDiv = document.createElement('div');
      itemDiv.id = `form${i}`;
      itemDiv.textContent = `${i + itemNumber}. ${items[i]}`;
      
      formsListDiv.appendChild(itemDiv);
      formsListDiv.appendChild(document.createElement('br'));

      
      if (Input.testEvidenceHeight(formsListDiv.outerHTML, pageNumber) > 800) {
        
        let d = document.getElementById(pageNumber);
        let child = document.getElementById(itemDiv.id);
        d.removeChild(child);
        
        restOfItems = items.slice(i);
        newStartingNumber = i + itemNumber;
        break;

      }
    }    

    Report.savedFormsPages.push(
      
      `<div class='page' id='formsPage'>
        <div class='caseHeader'>File No. ${Report.caseNumber}</div>
        <div id='formsPageTitle'>REPORT FORMS</div>
          ${document.getElementById(pageNumber).outerHTML}
        <div class='pageNumber'>${pageNumber}</div>
      </div>`

    );
    
    if (restOfItems.length > 0) {
      Input.constructFormPages(restOfItems, newStartingNumber);
    }
  },

  constructNarrativePages: function(narrative) {
  
    /**
     * [constructNarrativePages description]
     * @param  {String} narrative [Single string pulled from the report]
     * @return {Void}             
     */
    
    //Default 345 is used for the first page.  Changed later for subsequent pages
    let maxHeight = 705; //default height for the first page
    let narrativeArray = narrative.split('<br><br>');
    let thisPage = ``;
    let restOfArray = [];
    
    if ( Report.listOfNarrativePages.length > 0) {
      //still testing proper height
      maxHeight = 900;
    }

    //Iterates over each paragraph
    for (let i = 0; i < narrativeArray.length; i += 1) {
      let testString = thisPage.concat(narrativeArray[i]);
      //If it can be added to the first page of the report, do so.
      
      if (Input.testNarrativeHeight(testString) <= maxHeight) {
        thisPage = thisPage.concat(narrativeArray[i]).concat('<br><br>');
      }else {
        //Track the rest of the report that doesnt fit on the first page
        restOfArray = narrativeArray.slice(i);
        //break for loop so we can recursively enter the function with the rest of the narrativeArray
        break;
      }
    }

    if (Report.listOfNarrativePages.length === 0) {
      Report.listOfNarrativePages.push(Input.narrativeFirstPage(thisPage));
    } else {
      let nextPageNumber = Report.listOfNarrativePages.length + 1;
      Report.listOfNarrativePages.push(Input.narrativeExtraPages(thisPage, nextPageNumber));
    }
    
    if (restOfArray.length > 0) {
      let extraPages = restOfArray.join('<br><br>');
      Input.constructNarrativePages(extraPages);
    }
  },  

  constructWitnessPages: function(input) {
    let restOfArray = [];
    let pageOfInputSections = ``;
    
    for (let i = 0; i < input.length; i += 1) {
      
      if (Input.testHeight(pageOfInputSections.concat(input[i])) < 675) {
        pageOfInputSections = pageOfInputSections.concat(input[i]);
      } else {
        restOfArray.push(input[i]);
      }
    }
    Report.savedWitnessPages.push(Input.witnessPage(pageOfInputSections));
    if (restOfArray.length > 0){
      Input.constructWitnessPages(restOfArray);
    }
  },

  inputForms: function() {
    let numberOfForms = 1;
    _root.innerHTML = (`Confirm Report Screen<br><br>`);
    _root.innerHTML += 
      `
      List your forms
      <form id='confirmObjectForm'>
        <ol id='listOfForms'>
          <li> <input type='text' class='enteredForm'></li> 
        </ol>
          <button id="submit" type="submit">Confirm</button>
          <button id="addMoreForms" type="addMoreForms">Add another item</button>
        </form>
      `;

    const confirmObjectForm  = document.getElementById('confirmObjectForm');
    const listOfForms = document.getElementById('listOfForms');

    document.getElementById('submit').addEventListener('click', function(event) {
      event.preventDefault();
      for (let i = 0; i < confirmObjectForm.elements.length - 1; i += 1) {
        
        if (confirmObjectForm.elements[i].value.length > 0) {
          Report.listOfForms.push(confirmObjectForm.elements[i].value);
        }
      }

      Report.buildReport();
    });      

    document.getElementById('addMoreForms').addEventListener('click', function(event) {
      event.preventDefault();
      numberOfForms += 1;
      let newLi = document.createElement('li');
      let newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'enteredEvidence';
      newLi.appendChild(newInput);
      listOfForms.appendChild(newLi);
    });
  },
  
  inputEvidence: function(){
    // User Input area 
    let numberOfEvidenceItems = 1;
    _root.innerHTML = (`Confirm Report Screen<br><br>`);
    _root.innerHTML += 
      `
      List your evidence
      <form id='confirmObjectForm'>
        <ol id='evidenceItems'>
          <li> <input type='text' class='enteredEvidence'></li> 
        </ol>
          <button id="submit" type="submit">Confirm</button>
          <button id="addMoreEvidence" type="addMoreEvidence">Add another item</button>
        </form>
      `;

    const confirmObjectForm  = document.getElementById('confirmObjectForm');
    const evidenceItems = document.getElementById('evidenceItems');

    document.getElementById('submit').addEventListener('click', function(event) {
      event.preventDefault();
      for (let i = 0; i < confirmObjectForm.elements.length - 1; i += 1) {
        
        if (confirmObjectForm.elements[i].value.length > 0) {
          Report.evidenceItems.push(confirmObjectForm.elements[i].value);
        }
      }
      Input.inputForms();
    });      

    document.getElementById('addMoreEvidence').addEventListener('click', function(event) {
      event.preventDefault();
      numberOfEvidenceItems += 1;
      let newLi = document.createElement('li');
      let newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'enteredEvidence';
      newLi.appendChild(newInput);
      evidenceItems.appendChild(newLi);
      
    });
  }, 

  narrativeFirstPage: function(thisNarrativePage) {
    return `
    <div class='page' id='narrativePage'>
      <div id='narrativeHeader'>
        Copy to: <span class='narrativeIndent'>Commonwealth's Attorney for ${Report.ca.city}, Virginia</span><br>
        File No: <span class='narrativeIndent'>${Report.caseNumber}</span><br>
        Report of: <span class='narrativeIndent'>${Report.agent.title} ${Report.agent.firstName} ${Report.agent.middleName} ${Report.agent.lastName}</span><br>
        Office of Origin: <span class='narrativeIndent'>Chesapeake</span><br>
        Date: <span class='narrativeIndent'>${_formalFullDate}</span><br>
      </div>
      <div id='NOO'>NARRATIVE OF OFFENSE</div><br>
        <div id='narrativeContent'>
          ${thisNarrativePage}
        </div>
      <div class='pageNumber'>B</div>
    </div>
    `;
  },

  narrativeExtraPages: function(thisNarrativePage, pageNumber) {
    return `
    <div class='page' id='narrativePage2'>
      <div class='caseHeader2'>File No. ${Report.caseNumber}</div>
      <div id='narrativeContent'>
        ${thisNarrativePage}
      </div>
    <div class='pageNumber'>B-${pageNumber}</div>
    </div>
    `;
  },

  printObject: function(object){
    let printedObject = ``;
    
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        
        if (property === 'testimony') {
          printedObject = printedObject.concat(`
            <br>${_prettifiedProperty[property]}:<br> <textarea class='args' rows='10' cols='50' name='${property}' value='${object[property]}'>${object[property]}</textarea> <br>
          `);  
        
        } else {
          printedObject = printedObject.concat(`
            ${_prettifiedProperty[property]}: <input type='text' class='args' name='${property}' value='${object[property]}'> <br>
          `);
        }
      }
    }
    
    return printedObject;
  
  },

  sliceReport: function(input){
    Report.caseNumber = _caseNumberInput.value;
    //Define RegEx patterns
    const jurisdictionPattern        = /(Jurisdiction:..).*/;
    const narrativePattern           = /\n\n(.|\n)*(?=2\tEVENTS)/;
    const blockOfPersonsPattern      = /3\tPERSONS\n(.|\n)*(?=4\tORGANIZATIONS)/g;
    const eachPersonBlockPattern     = /((Person Role)(.|\n)*?(\n\n))/g;
    const personRolePattern          = /(Person Role:.).*(?=\n)/;
    const personNamePattern          = /(\nTitle\/Name:.).*(?=.Race)/;
    const personRacePattern          = /(Race:.).*(?= Sex)/;
    const personSexPattern           = /(Sex:.).*(?=\n)/;
    const personDOBPattern           = /(\nDOB:.).*(?=  Age)/;
    const personEthnicityPattern     = /(\nEthnicity:.).*(?=  Resident)/;
    const personSSNPattern           = /(\nSSN:.).*(?=  Driver's License Number)/;
    const personFullAddressPattern   = /(\nResidential Address:.).*(?=\n)/;
    const personPersonalPhonePattern = /((\n(Personal)) Telephone: ).*\S/;
    const personWorkPhonePattern     = /((\n(Work)) Telephone: ).*\S/;
    const personHeightPattern        = /(\nHeight:.).*(?=...Weight)/;
    const personWeightPattern        = /(Weight:.).*(?=...Build)/;
    const personHairColorPattern     = /(\nHair Color:.).*(?=  Hair Length)/;
    const personEyeColorPattern      = /(\nEye Color:.).*(?=..Skin Tone)/;
    const personTestimonyPattern     = /(\nDescription of Testimony:.)(.|\n)*/;
    const jurisdiction               = input.match(jurisdictionPattern)[0].slice(14);
    const narrative = input.match(narrativePattern)[0].slice(2).replace(/\n/g,'<br>');
    
    Report.rawNarrative = narrative;
    Report.ca = new Person(..._caInfo[jurisdiction]);
   

    //Slice out the 'Persons' section of the report
    const blockOfPersons = input.match(blockOfPersonsPattern)[0];

    //Create a string for each Person, and push each string to an array
    const arrayOfPersons = blockOfPersons.match(eachPersonBlockPattern);

    ///Iterate over the array and define property of the person
    arrayOfPersons.map(function (personBlock) {
      let role, name, nameArray, lastName, firstName, middleName, suffix, race, sex, 
          shortDOB, ethnicity, ssn, personalPhone, workPhone, height, weight, 
          fullAddress, fullAddressArray, street, city, state, zip, hairColor, 
          eyeColor, testimony;
      
      try {
        role = personBlock.match(personRolePattern)[0].slice(13) || '';
      }

      catch(e) {
        role = ``;  
      }
      
      try {
        name = personBlock.match(personNamePattern)[0].slice(13) || '';
      }

      catch(e) {
        name = ``;  
      }
      
      try {
        nameArray = name.split(' ');
      }

      catch(e) {
        nameArray = ``; 
      }
      
      try {
        lastName = nameArray[0].replace(`,`, ``);
      }

      catch(e) {
        lastName = ``;  
      }
      
      try {
        firstName = nameArray[1];
      }

      catch(e) {
        firstName = ``; 
      }
      
      try {
        middleName = nameArray[2] || ``;
      }

      catch(e) {
        middleName = ``; 
      }

      suffix = ``;
      
      try {
        race = personBlock.match(personRacePattern)[0].slice(6) || '';
      }

      catch(e) {
        race = ``;  
      }
      
      try {
        sex = personBlock.match(personSexPattern)[0].slice(5) || '';
      }

      catch(e) {
        sex = ``; 
      }
      
      try {
        shortDOB = personBlock.match(personDOBPattern)[0].slice(6) || '';
      }

      catch(e) {
        shortDOB = ``;  
      }
      
      try {
        ethnicity = personBlock.match(personEthnicityPattern)[0].slice(12) || '';
      }

      catch(e) {
        ethnicity = ``; 
      }
      
      try {
        ssn = personBlock.match(personSSNPattern)[0].slice(6) || '';
      }

      catch(e) {
        ssn = ``; 
      }
      
      try {
        fullAddress      = personBlock.match(personFullAddressPattern)[0].slice(22);
        fullAddressArray = fullAddress.split(`, `);
        street           = fullAddressArray[0] || ``;
        city             = fullAddressArray[1] || ``;
        state            = fullAddressArray[2].split(` `)[0] || ``;
        zip              = fullAddressArray[2].split(` `)[1] || ``;
      }

      catch(e) {
        fullAddress = ``;
        street = ``;
        city = ``;
        state = ``;
        zip = ``;
      }
      
      try {
        personalPhone = personBlock.match(personPersonalPhonePattern)[0].slice(21) || '';
      }

      catch(e) {
        personalPhone = ``;
      }
      
      try {
        workPhone = personBlock.match(personWorkPhonePattern)[0].slice(17);
        if (!personalPhone) { personalPhone = workPhone;  workPhone = ``;}
      }

      catch(e) {
        workPhone = ``;
      }
      
      try {
        height = personBlock.match(personHeightPattern)[0].slice(9) || '';
      }

      catch(e) {
        height = ``;
      }
      
      try {
        weight = personBlock.match(personWeightPattern)[0].slice(8) || '';
      }

      catch(e) {
        weight = ``;
      }
      
      try {
        hairColor = personBlock.match(personHairColorPattern)[0].slice(13) || '';
      }

      catch(e) {
        hairColor = ``;
      }
      
      try {
        eyeColor = personBlock.match(personEyeColorPattern)[0].slice(12) || '';
      }

      catch(e) {
        eyeColor= ``;
      }

      try {
        testimony = personBlock.match(personTestimonyPattern)[0].slice(27) || '';    
      }

      catch(e) {
        testimony = ``;
      }

      if (race === 'White' && ethnicity === 'Hispanic') {
        race = 'Hispanic';
      }

      switch (role) {
        case 'Subject':
          Report.detectedSuspects.push(new Suspect( firstName, middleName, 
                                                    lastName, suffix, race, sex, 
                                                    shortDOB, height, weight, 
                                                    hairColor, eyeColor, ssn, 
                                                    street, city, state, zip, 
                                                    '' ));
          break;

        case 'Witness':
        case 'Victim':
          Report.detectedWitnesses.push(new Witness( firstName, middleName, 
                                                     lastName, suffix, street, 
                                                     city, state, zip, 
                                                     personalPhone, testimony) );
          break;
      }

    });
    Input.confirmReport();
  },

  testHeight: function(testInput) {
    //applies the input to a hidden div to measure its offsetHeight;
    
    _hidden.innerHTML = testInput;
   
    return _hidden.offsetHeight;  
  },

  testEvidenceHeight: function (content, pageNumber) {
    let environmentTop = 
    `<div class='page' id='evidencePage'>
        <div class='caseHeader'>File No. ${Report.caseNumber}</div>
        <div id='evidencePageTitle'>EVIDENCE</div>`;

    let envrionmentBottom = 
      `<div class='pageNumber'>##}</div>
    </div>`;

    let testContent = environmentTop.concat(content).concat(envrionmentBottom);
    
    _hidden.innerHTML = testContent;
    
    let contentHeight = document.getElementById(pageNumber).offsetHeight;
    

    return contentHeight;
  },

  testNarrativeHeight: function (content) {
    let environmentTop = 
    `<div class='page' id='narrativePage'>
      <div id='narrativeHeader'>
        Copy to: <span class='narrativeIndent'>Commonwealth's Attorney for ${Report.ca.city}, Virginia</span><br>
        File No: <span class='narrativeIndent'>${Report.caseNumber}</span><br>
        Report of: <span class='narrativeIndent'>${Report.agent.title} ${Report.agent.firstName} ${Report.agent.middleName} ${Report.agent.lastName}</span><br>
        Office of Origin: <span class='narrativeIndent'>Chesapeake</span><br>
        Date: <span class='narrativeIndent'>${_formalFullDate}</span><br>
      </div>
      <div id='NOO'>NARRATIVE OF OFFENSE</div><br>
        <div id='narrativeContent'>
          ${content}
        `;


    if (Report.listOfNarrativePages.length > 0) {
      environmentTop = 
      `<div class='page' id='narrativePage2'>
      <div class='caseHeader2'>File No. ${Report.caseNumber}</div>
      <div id='narrativeContent'>
      ${content}`;
    }

    let envrionmentBottom = 
      `</div>
      <div class='pageNumber'>##</div>
    </div>`;

    let testContent = environmentTop.concat(envrionmentBottom);
    
    _hidden.innerHTML = testContent;
    let contentHeight = document.getElementById('narrativeContent').offsetHeight;

    return contentHeight;
  },

  validateFirstInputs: function (report) {

    _messageBox.innerHTML = ``;
    
    if (!_caseNumberInput.value) {
      _messageBox.innerHTML += `Error - Enter a case number<br>`; 
    }
    
    if (!Report.agent.hasOwnProperty('firstName')) {
      _messageBox.innerHTML += `Error - Select and Confirm User<br>`;
    }

    if (!_liraInput.value) {
      _messageBox.innerHTML += `Error - Enter LIRA before generating report<br>`;
    }

    if (_caseNumberInput.value && _liraInput.value && Report.agent.hasOwnProperty('firstName')) {
      Input.sliceReport(report);
    }
  },

  witnessPage: function(itemsForPage) {
    let pageNumber = `D`;
    if (Report.witnessPages.length > 0) {
      pageNumber = `D-${Report.witnessPages.length + 1}`;
    }
    return `
    <div class='page' id='witnessPage'>
      <div class='caseHeader'>File No. ${Report.caseNumber}</div>
      <div id='witnessPageTitle'>WITNESSES</div>
      ${itemsForPage}
      <div class='pageNumber'>${pageNumber}</div>
    </div>
    `;
  },
};

const Report = {
  agent:{},
  ca: {},
  caseNumber: '',
  date: '',
  detectedSuspects: [],
  detectedWitnesses: [],
  evidenceItems: [],
  listOfForms: [],
  listOfNarrativePages: [],
  rawNarrative: '',
  savedCa: [],
  savedEvidencePages: [],
  savedFormsPages: [],
  savedSuspects: [],
  savedWitnesses: [],
  savedWitnessPages: [],


  get coverLetter() { 
    return `
    <div class='page' id='coverPage'>
      <div id='coverLetterHeader'>
      555 Patriot Parkway, ACity, VA 12345-1234<br> 
      (555) 555-5555<br>
      ${_formalFullDate}<br>
      </div>

      <div id='caAddress'>
        The Honorable ${Report.ca.fullName}<br>
        Commonwealth's Attorney<br>
        City of ${Report.ca.city}<br>
        ${Report.ca.streetAddress}<br>
        ${Report.ca.city}, Virginia ${Report.ca.zipCode}<br>
      </div>

      <div id='coverSubject'>
        Re:   ${Report.savedSuspects[0].firstName} ${Report.savedSuspects[0].middleName} ${Report.savedSuspects[0].lastName} - Suspect<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Report.savedSuspects[0].firstCharge}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Case No: ${Report.caseNumber}<br>
      </div><br>

      <div id='coverBody'>
        Dear ${Report.ca.title} ${Report.ca.lastName},<br><br>

        Enclosed are reports prepared by ${Report.agent.title} ${Report.agent.firstName} ${Report.agent.middleName} ${Report.agent.lastName}.  Please advise of your prosecutive decision at your earliest convenience.<br><br>

        If you have any questions, please call ${Report.agent.supervisor} at ${Report.agent.officeNumber}.<br><br>
      </div>
      
      <div id='coverSignature'>Sincerely,<br><br><br>
        ${Report.agent.lieutenant} for<br>
        ${Report.agent.captain}<br>
        Commander<br>
        Detective Bureau<br>
        Local Field Office<br>
      </div>
      <br><br>

      ABC/DEF/ghu<br>
      Enclosures<br>


      <footer id='coverFooter'>THE ENCLOSED INFORMATION IS FURNISHED IN CONFIDENCE AND IS NOT TO BE RELEASED WITHOUT AUTHORIZATION.  SHOULD A SUBPOENA BE FILED IN AN EFFORT TO OBTAIN INFORMATION HEREIN, THE DEPARTMENT SHOULD BE IMMEDIATELY NOTIFIED.</footer>
    </div>
    `;
  },

  get titlePage() {
    return `
    <div class='page' id='titlePage'>
      <div id='cov'>JURISDICTION NAME</div><br>
      <div id='dosp'>POLICE DEPARTMENT</div><br><br>
      Detective Bureau<br><br>
      ${_formalFullDate}<br><br>
      Report of Investigation Concerning ${Report.savedSuspects[0].firstName} ${Report.savedSuspects[0].lastName} ${Report.savedSuspects[0].suffix}<br>
      ${Report.savedSuspects[0].titlePageCharges}
    </div>
    `;
  },

  get indexPage() {
    return `
    <div class='page' id='indexPage'>

      <h2 class='pageTitle'>TABLE OF CONTENTS</h2>
      
      <span class='leftCol'>Narrative of Offense</span> <span class='rightCol indexLetter'>B</span><br>
      
      <span class='leftCol'>Name of Suspect</span> <span class='rightCol indexLetter'>C</span><br>
        
      <span class='leftCol'>Witnesses</span> <span class='rightCol indexLetter'>D</span><br>
        
      <span class='leftCol'>Evidence</span> <span class='rightCol indexLetter'>E</span><br>
        
      <span class='leftCol'>Report Form</span> <span class='rightCol indexLetter'>F</span><br>

      <div class='pageNumber'>A</div>
    </div>

    `;
  },

  get narrativePages() {
    return Report.listOfNarrativePages.map( (eachPage) => {
      return eachPage;
    });
  },

  get suspectPages() {
    return Report.savedSuspects.map( (eachSuspect, suspectNumber) => {
      return eachSuspect.suspectPage;
    });
  },

  get witnessPages() {
    
    return Report.savedWitnessPages;      
  },

  get evidencePages() {
    
    return Report.savedEvidencePages;
  },

  get formsPages() {

    return Report.savedFormsPages;
  },

  buildReport: function(){

    let arrayOfPrintedWitnesses = Report.savedWitnesses.map( (eachWitness) => {
      return eachWitness.witnessInfo;
    });

    Input.constructNarrativePages(Report.rawNarrative);
    Input.constructWitnessPages(arrayOfPrintedWitnesses);
    Input.constructEvidencePages(Report.evidenceItems, 1);
    Input.constructFormPages(Report.listOfForms, 1);
    
    _root.innerHTML = 
      Report.coverLetter
          .concat(Report.titlePage)
          .concat(Report.indexPage)
          .concat(Report.narrativePages)
          .concat(Report.suspectPages)
          .concat(Report.witnessPages)
          .concat(Report.evidencePages)
          .concat(Report.formsPages);
  
    localStorage.setItem('Report1', _root.innerHTML);
  }
};

const Settings = {
  
  buildAgentObject: function(selectedValue){
    
    if (selectedValue === '') {
      return;
    }

    let title = 'Special Agent';
    let titleAbbrv = 'SA';
    let lieutenant = 'Lieutenant Alford B. Charles';
    let captain = 'Captain Daniel Edward Frankford';
    let officeNumber = '(555) 555-5555';
    let firstName;
    let lastName;
    let middleName;
    let suffix;
    let supervisor;

    switch (selectedValue) {
      
      case 'user01':
        firstName = 'Adam';
        lastName = 'User01';
        middleName =  'R.';
        suffix = '';
        supervisor = 'First Sergeant G. H. Smith';
        break;

      case 'user02':
        firstName = 'Bill';
        lastName = 'User02';
        middleName = 'T.';
        suffix = '';
        supervisor = 'First Sergeant G. H. Smith';
        break;

      case 'user03':
        firstName = 'Charlie';
        lastName = 'User03'; 
        middleName = 'N.'; 
        suffix = '';
        supervisor = 'First Sergeant G. H. Smith';
        break;

      case 'user04':
        firstName = 'David';
        lastName = 'User04'; 
        middleName = 'D.'; 
        suffix = '';
        supervisor = 'First Sergeant G. H. Smith';
        break;

      case 'foglemanML':
        firstName = 'Marc';
        lastName = 'Fogleman'; 
        middleName = 'L.'; 
        suffix = '';
        supervisor = 'First Sergeant G. H. Smith';
        break;
    }

    //using an array and spread operator array to save Report.agent for constructor 
    //purposes when loading from local storage. TODO: this wasnt the right way to
    //do that.  Go back and associate the type of Person (Agent, Witness, Suspect), 
    //with a property inherited from Person 

    Report.agent = new Investigator(title, titleAbbrv, firstName, middleName, 
                                    lastName, suffix, supervisor, lieutenant, 
                                    captain, officeNumber);
   
    _messageBox.innerHTML = ` Agent chosen: ${Report.agent.title} ${Report.agent.firstName} ${Report.agent.lastName} `;
    
    localStorage.setItem('selectedValue', selectedValue);
  },

  loadSavedUser: function() {
    //Checks for stored _agent Object.  If present, selects it for the report
    if (localStorage.getItem('selectedValue')) {

      let selectedValue = localStorage.getItem('selectedValue');
      Settings.buildAgentObject(selectedValue);
     
      //Populates the user box with the selected user for UX purposes
      let agentInputSelector = document.getElementById('agentInput');
      
      for (let option, i = 0; i < agentInputSelector.length; i += 1) {
        option = agentInputSelector.options[i];

        if (option.value === selectedValue) {
          agentInputSelector.selectedIndex = i;
        }

      }
    }
  }
};



 
/****************
*Event Listeners*
****************/

_liraForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let report = _liraInput.value;
  
  Input.validateFirstInputs(report);
  
});

_userForm.addEventListener('submit', function(event){
  event.preventDefault();
  let selectedValue = _userForm.elements.agentInput.value;
  Settings.buildAgentObject(selectedValue);
});




if (debug.mode === true) {
  _caseNumberInput.value = '18-123456'; 
  Settings.loadSavedUser();

} else {
  
  Window.onload = Settings.loadSavedUser();

}