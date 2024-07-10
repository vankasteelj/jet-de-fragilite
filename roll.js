const $die = $('.die')
const $action = $('.result .reaction')
const $button = $('.button .randomize')
const sides = 20
const animationDuration  = 1500
let timeoutId = undefined

const actions = {
  echecCritique: [
    "Échec critique",
    "Tape de rage contre un mur et pète toi la main",
    "Retiens une larme... Craque. Chiale. Le monde est injuste avec toi",
    "Fais des pompes et des tractions pour passer la frustration (et fais-toi mal)",
    "Serre les poings, regarde en l'air, prends une grande inspiration par le nez et dis : \"T'as raison !\"",
    "Vexé, tu essayes de t'en sortir avec les leçons de vie de Jordan Peterson",
    "Accepte la contradiction mais passe ta colère sur le premier truc vulnérable à portée"
  ],
  echec: [
    "Échec",
    "N'exprime pas ta colère par des mots mais par des soupirs et des râles réguliers de cachalot en rut",
    "Quitte la pièce en claquant la porte",
    "Tu sais que tu as tort. Continue à hurler, admet que tu as tort, puis remets-toi à hurler",
    "Réponds : \"Oui mais les hommes souffrent aussi et ça on n'en parle jamais, OK?\"",
    "Joue la victime",
    "Réponds : \"On en parlera quand il s'agira de porter des trucs lourds\"",
    "Réponds : \"Non mais je le savais déjà\"",
    "Réponds : \"Non mais c'est bon, j'avais compris\"",
    "Oublie instantanément le mode d'emploi de tous les appareils ménagers et n'essaye surtout pas de comprendre comment ils fonctionnent"
  ],
  reussiteMoyenne: [
    "Réussite moyenne",
    "Accuse l'autre d'être désagréable",
    "Réponds : \"Je ne comprends pas, je suis pourtant un mec bien\"",
    "Réponds : \"C’est bien un truc de gonzesse, ça\"",
    "Explique pourquoi l'autre a mal compris",
    "Réponds : \"On ne peut plus rien dire\""
  ],
  reussite: [
    "Réussite",
    "Réponds : \"Arrête d'être en colère, sois rationnelle un peu !\"",
    "Réponds : \"T'as tes règles ou quoi ?\"",
    "Réponds : \"Je suis désolé que tu n'aies pas compris ce que j'ai voulu dire\"",
    "Réponds : \"Je ne pleure pas, je sue de la colère par les yeux\"",
    "Ignore la personne en faisant mine de tâter un mur, avant de sortir : \"C'est un mur porteur ça, non ?\"",
    "Interdiction de te soigner si tu ressens de la douleur. D'ailleurs, tu n'en ressens pas", 
    "Réponds : \"Je suis un homme, c'est normal que je sois en colère\"",
    "Réponds : \"J'ai eu une mauvaise journée au travail, tu peux comprendre ?\""
  ],
  reussiteCritique: [
    "Réussite critique",
    "Excuse-toi, puis ajoute un \"mais\"... et déroule à nouveau ton point de vue problématique",
    "Réponds : \"Non t’as pas bien compris, je vais répéter en PARLANT PLUS FORT\"",
    "Réponds : \"Désolé que tu le prennes comme ça\""
  ]
}

const randomFace = () => {
  const face = Math.floor((Math.random() * sides)) + 1
  return face;
}

const randomAction = (face, reroll) => {
  const range = (() => {
    if (face <= 2) return 'echecCritique'
    if (face <= 9) return 'echec'
    if (face <= 15) return 'reussiteMoyenne'
    if (face <= 18) return 'reussite'
    if (face <= 20) return 'reussiteCritique'
  })()
  const i = actions[range].length - 1
  const rand = Math.floor((Math.random() * i)) + 1
  console.log('Résultat: %s - %s (action %s: %s)', face, actions[range][0].toLowerCase(), rand, actions[range][rand])
  setTimeout(() => {
    $('.resultPopup').text(actions[range][0]).fadeIn(100).delay(600).fadeOut(1000)
  }, 200)
  return actions[range][rand]
}

const rollTo = (face) => {
  clearTimeout(timeoutId)
  $die.attr('data-face', face)
}

$('.randomize, .die').click(() => {
  $action.fadeOut()
  $die.addClass('rolling')
  clearTimeout(timeoutId)
  
  const roll = randomFace()

  timeoutId = setTimeout(() => {
    $action.text(randomAction(roll))
    $die.removeClass('rolling')
    $button.text('Relancer')
    $action.delay(300).fadeIn()

    rollTo(roll)
  }, animationDuration)
  
  return false
})