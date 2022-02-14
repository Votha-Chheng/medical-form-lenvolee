import {createContext, useContext, useState} from 'react'

const ValuesContext = createContext()

const ValuesProvider = ({children})=>{

  const [values, setValues] = useState({
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
    resetValues
  }

  return <ValuesContext.Provider value={contextValue}>
    {children}
  </ValuesContext.Provider>
}

export const useValuesContext = ()=>useContext(ValuesContext)

export default ValuesProvider