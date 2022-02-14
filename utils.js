export const dateToString = (date)=>{
  let jour = "", mois = "", annee = ""
  const arrayDate = date.split(" ")

  switch (arrayDate[0]) {
    case "Sun":
      jour = "Dimanche"
      break
    case "Mon":
      jour = "Lundi"
      break
    case "Tue":
      jour = "Mardi"
      break
    case "Wed":
      jour = "Mercredi"
      break
    case "Thu":
      jour = "Jeudi"
      break
    case "Fri":
      jour = "Vendredi"
      break
    case "Sat":
      jour = "Samedi"
      break
  }

  switch (arrayDate[1]) {
    case "Jan":
      mois = "Janvier"
      break
    case "Feb":
      mois = "Février"
      break
    case "Mar":
      mois = "Mars"
      break
    case "Apr":
      mois = "Avril"
      break
    case "May":
      mois = "Mai"
      break
    case "Jun":
      mois = "Juin"
      break
    case "Jul":
      mois = "Juillet"
      break
    case "Aug":
      mois = "Août"
      break
    case "Sep":
      mois = "Septembre"
      break
    case "Oct":
      mois = "Octobre"
      break
    case "Nov":
      mois = "Novembre"
      break
    case "Dec":
      mois = "Décembre"
      break
  }

  annee = arrayDate[3]

  return `${jour} ${arrayDate[2]} ${mois} ${annee}`
}

export const getHTML = (values)=>{
  return (
    `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
          
        </body>
      </html>
    `
  )
}