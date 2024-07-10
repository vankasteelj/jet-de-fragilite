const $die = $('.die')
const $action = $('.result .reaction')
const $button = $('.button .randomize')
const sides = 20
const initialSide = 1
const transitionDuration = 500
const animationDuration  = 1500
let lastFace = undefined
let lastAction = undefined
let timeoutId = undefined

const actions = {
  cfail: [
    "Échec critique",
    "Tape de rage contre un mur et pète toi la main",
    "Retiens une larme... Craque. Chiale. Le monde est injuste avec toi",
    "Fais des pompes et des tractions pour passer la frustration (et fais-toi mal)",
    "Serre les poings, regarde en l'air, prends une grande inspiration par le nez et dis : \"T'as raison !\"",
    "Vexé, tu essayes de t'en sortir avec les leçons de vie de Jordan Peterson",
    "Accepte la contradiction mais passe ta colère sur le premier truc vulnérable à portée"
  ],
  fail: [
    "Échec",
    "N'exprime pas ta colère par des mots mais par des soupirs et des râles réguliers de cachalot en rut",
    "Quitte la pièce en claquant la porte",
    "Tu sais que tu as tort. Continue à hurler, admet que tu as tort, puis remets-toi à hurler",
    "\"Oui mais les hommes souffrent aussi et ça on n'en parle jamais, OK?\"",
    "Joue la victime",
    "\"On en parlera quand il s'agira de porter des trucs lourds\"",
    "\"Non mais je le savais déjà\"",
    "\"Non mais c'est bon, j'avais compris\"",
    "Oublie instantanément le mode d'emploi de tous les appareils ménagers et n'essaye surtout pas de comprendre comment ils fonctionnent"
  ],
  mid: [
    "Réussite moyenne",
    "Accuse l'autre d'être désagréable",
    "\"Je ne comprends pas, je suis un mec bien\"",
    "\"C’est bien un truc de gonzesse, ça\"",
    "Explique pourquoi l'autre a mal compris",
    "\"On ne peut plus rien dire\""
  ],
  success: [
    "Réussite",
    "\"Arrête d'être en colère, sois rationnelle un peu !\"",
    "\"T'as tes règles ou quoi ?\"",
    "\"Je suis désolé que tu n'aies pas compris ce que j'ai voulu dire\"",
    "\"Je ne pleure pas, je sue de la colère par les yeux\"",
    "Ignore la personne en faisant mine de tâter un mur, avant de sortir : \"C'est un mur porteur ça, non ?\"",
    "Interdiction de te soigner si tu ressens de la douleur. D'ailleurs, tu n'en ressens pas", 
    "\"Je suis un homme, c'est normal que je sois en colère\"",
    "\"J'ai eu une mauvaise journée au travail, tu peux comprendre ?\""
  ],
  csuccess: [
    "Réussite critique",
    "Excuse-toi, puis ajoute un \"mais\"... et déroule à nouveau ton point de vue problématique",
    "\"Non t’as pas bien compris, je vais répéter en PARLANT PLUS FORT\"",
    "\"Désolé que tu le prennes comme ça\""
  ]
}

const randomFace = () => {
  const face = Math.floor((Math.random() * sides)) + initialSide
  lastFace = face == lastFace ? randomFace() : face
  return lastFace;
}

const randomAction = (face) => {
  const range = (() => {
    if (face <= 2) return 'cfail'
    if (face <= 9) return 'fail'
    if (face <= 15) return 'mid'
    if (face <= 18) return 'success'
    if (face <= 20) return 'csuccess'
  })()
  const i = actions[range].length - 1
  const rand = Math.floor((Math.random() * i)) + 1
  lastAction = rand == lastAction ? randomAction(face) : rand
  console.log('Jet de dé: la face %s est un(e) %s - La phrase %s est: %s', face, actions[range][0], rand, actions[range][lastAction])
  return actions[range][lastAction]
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
  setTimeout(() => {
    $action.text(randomAction(roll))
  }, 500)

  timeoutId = setTimeout(() => {
    $die.removeClass('rolling')
    $button.text('Relancer')
    setTimeout(() => {
      $action.fadeIn()
    }, 300)

    rollTo(roll)
  }, animationDuration)
  
  return false
})