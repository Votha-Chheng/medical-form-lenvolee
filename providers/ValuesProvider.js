import {createContext, useContext, useState} from 'react'

const ValuesContext = createContext()

const ValuesProvider = ({children})=>{

  const [nom, setNom] = useState(undefined)
  const [prenom, setPrenom] = useState(undefined)
  const [age, setAge] = useState(undefined)
  const [adresse, setAdresse] = useState(undefined)
  const [codePostal, setCodePostal] = useState(undefined)
  const [ville, setVille] = useState(undefined)
  const [hasAPhoneNumber, setHasAPhoneNumber] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [nbFrat, setNbFrat] = useState(0)
  const [fratSituation, setFratSituation] = useState("")
  const [niveauScolaire, setNiveauScolaire] = useState("")
  const [loisir, setLoisir] = useState([])

  const [values, setValues] = useState({
    dr:"Sylvie MA-Francin",
    dateRdv : new Date().toDateString(),
    genre : "Madame",
    nom : undefined, //
    prenom:undefined, //
    dateDeNaissance:undefined, //
    tel:undefined, //
    email:undefined, //
    profession:undefined, //
    adresse:undefined, //
    codePostal:undefined, //
    ville:undefined, //
    medecinTraitant : undefined, //
    dateDernierExamen:undefined, //
    changementEtatSante:undefined, //
    maladies:[],
    saignementInterventionAccident:undefined, //
    traitementRadiations:undefined, //
    priseMedicamentActuelle:undefined,
    medicamentsActuels:[],
    allergies : undefined, //
    allergiesListe:[],
    fumeur:undefined, //
    cigarettesParJour:"",
    enceinte :undefined, //
    moisDeGrossesse:"",
    pilule:"",
    osteoporose:undefined, //
    medicOsteoporose :[],
    dateDernierExamDentaire:undefined, //
    motifConsultation:undefined, //
    difficulteDentiste:undefined, //
    listeDifficulteDentiste:[],
    //Gencives
    dentsEcartes:undefined, //
    saignementGencive:undefined, //
    traitementGencive:undefined, //
    traitementGencivesPar:[],
    //Dents
    dentsExtraites:undefined, //
    causesExtraction : [],
    dentsRemplacees:null,
    moyenDentRemplacement : [],
    raisonsNonRemplacementDentsExtraites : [],
    sensationProthesesActuelles:null,
    utilisationMetaux:undefined, //
    preferencesUtilisationMetaux:[],
    dentsSensibles:undefined, //
    listeSensibilite : [],
    //Mâchoires
    serrementGrincementDents:undefined, //
    craquementClaquementDouleurOuvertureMachoire:undefined, //
    difficulteAvalerMacherCoteUnique:undefined, //
    //Hygiène dentaire
    typeBrosseADent:undefined, //
    momentsBrossageDents:undefined, //
    rythmeChangementBrosseAdent:undefined, //
    utilisationFilDentaireBrossette:undefined, //
    //Habitudes
    habitudes:[],
    mauvaiseHaleine : undefined, //
    //Dentisterie esthétique
    dentsMemeCouleurs:undefined,
    souhaitDentsPlusBlanches:undefined, //
    satisfactionDentsGencives: undefined, //
    mainDevantBoucheSourire:undefined, //
    souhaitsChangementOuiNon:undefined, //
    souhaitsChangement:[],

    //Reprendre ici!!!
    //Divers
    appareilDentaireUneFois:undefined, //
    preoccupationDentsOuiNon:undefined, //
    preoccupationDents:"",
    modifierDentsOuiNon:undefined, //
    modifierDents:"",
    anxieuxSoinsDentaires:undefined, //
    commentConnaissezVousLeCabinet:undefined, //
    autresRemarquesUtilesOuiNon:undefined, //
    autresRemarquesUtiles:""
  })

  const resetValues = ()=>{
    setValues({
      dr:"Sylvie MA-Francin",
      dateRdv : new Date(),
      genre : "Madame",
      nom : undefined, //
      prenom:undefined, //
      dateDeNaissance:undefined, //
      tel:undefined, //
      email:undefined, //
      profession:undefined, //
      adresse:undefined, //
      codePostal:undefined, //
      ville:undefined, //
      medecinTraitant : undefined, //
      dateDernierExamen:undefined, //
      changementEtatSante:undefined, //
      maladies:[],
      saignementInterventionAccident:undefined, //
      traitementRadiations:undefined, //
      priseMedicamentActuelle:undefined,
      medicamentsActuels:[],
      allergies : undefined, //
      allergiesListe:[],
      fumeur:undefined, //
      cigarettesParJour:"",
      enceinte :undefined, //
      moisDeGrossesse:"",
      pilule:"",
      osteoporose:undefined, //
      medicOsteoporose :[],
      dateDernierExamDentaire:undefined, //
      motifConsultation:undefined, //
      difficulteDentiste:undefined, //
      listeDifficulteDentiste:[],
      //Gencives
      dentsEcartes:undefined, //
      saignementGencive:undefined, //
      traitementGencive:undefined, //
      traitementGencivesPar:[],
      //Dents
      dentsExtraites:undefined, //
      causesExtraction : [],
      dentsRemplacees:null,
      moyenDentRemplacement : [],
      raisonsNonRemplacementDentsExtraites : [],
      sensationProthesesActuelles:null,
      utilisationMetaux:undefined, //
      preferencesUtilisationMetaux:[],
      dentsSensibles:undefined, //
      listeSensibilite : [],
      //Mâchoires
      serrementGrincementDents:undefined, //
      craquementClaquementDouleurOuvertureMachoire:undefined, //
      difficulteAvalerMacherCoteUnique:undefined, //
      //Hygiène dentaire
      typeBrosseADent:undefined, //
      momentsBrossageDents:undefined, //
      rythmeChangementBrosseAdent:undefined, //
      utilisationFilDentaireBrossette:undefined, //
      //Habitudes
      habitudes:[],
      mauvaiseHaleine : undefined, //
      //Dentisterie esthétique
      dentsMemeCouleurs:undefined,
      souhaitDentsPlusBlanches:undefined, //
      satisfactionDentsGencives: undefined, //
      mainDevantBoucheSourire:undefined, //
      souhaitsChangementOuiNon:undefined, //
      souhaitsChangement:[],
  
      //Reprendre ici!!!
      //Divers
      appareilDentaireUneFois:undefined, //
      preoccupationDentsOuiNon:undefined, //
      preoccupationDents:"",
      modifierDentsOuiNon:undefined, //
      modifierDents:"",
      anxieuxSoinsDentaires:undefined, //
      commentConnaissezVousLeCabinet:undefined, //
      autresRemarquesUtilesOuiNon:undefined, //
      autresRemarquesUtiles:""
    })
  }

  const contextValue = {
    values,
    setValues,
    resetValues,
    nom, setNom,
    prenom, setPrenom,
    age, setAge,
    adresse, setAdresse,
    codePostal, setCodePostal,
    ville, setVille,
    hasAPhoneNumber, setHasAPhoneNumber,
    phoneNumber, setPhoneNumber,
    nbFrat, setNbFrat,
    fratSituation, setFratSituation,
    niveauScolaire, setNiveauScolaire,
    loisir, setLoisir
  }

  return <ValuesContext.Provider value={contextValue}>
    {children}
  </ValuesContext.Provider>
}

export const useValuesContext = ()=>useContext(ValuesContext)

export default ValuesProvider