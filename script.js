const bladeDraw = document.getElementById('blade-draw')
const shieldBlock = document.getElementById('shield-block')
const swordClash = document.getElementById('sword-clash')
const swordImpact = document.getElementById('sword-impact')
const swordSlash = document.getElementById('sword-slash')

const heroForm = document.getElementById('hero-form')
const fieldSet = heroForm.querySelector('fieldset')
const heroInput = document.getElementById('hero')
const xpInput = document.getElementById('xp')
const mainBtn = document.getElementById('main-btn')

const modal = document.getElementById('modal')
const modalBackdrop = modal.querySelector('.modal-backdrop')
const modalContent = document.getElementById('modal-content')
const closeModalBtn = document.getElementById('close-modal-btn')
const displayTextHero = document.getElementById('display-text-hero')
const displayTextLvl = document.getElementById('display-text-lvl')

let heroFormStillValid = heroForm.checkValidity()
reactToHeroFormValidity()

heroForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const formData = new FormData(heroForm)

  const hero = formData.get('hero')
  const xp = Number(formData.get('xp'))

  let lvl = 'Ferro'

  if (xp >= 1001 && xp <= 2000) {
    lvl = 'Bronze'
  } else if (xp >= 2001 && xp <= 5000) {
    lvl = 'Prata'
  } else if (xp >= 5001 && xp <= 7000) {
    lvl = 'Ouro'
  } else if (xp >= 7001 && xp <= 8000) {
    lvl = 'Platina'
  } else if (xp >= 8001 && xp <= 9000) {
    lvl = 'Ascendente'
  } else if (xp >= 9001 && xp <= 10000) {
    lvl = 'Imortal'
  } else if (xp >= 10001) {
    lvl = 'Radiante'
  }

  displayTextHero.textContent = hero
  displayTextLvl.textContent = lvl
  openModal()

  setTimeout(function () {
    if (lvl === 'Ferro' || lvl === 'Bronze') {
      shieldBlock.play()
    } else if (lvl === 'Prata' || lvl === 'Ouro' || lvl === 'Platina') {
      swordImpact.play()
    } else if (
      lvl === 'Ascendente' ||
      lvl === 'Imortal' ||
      lvl === 'Radiante'
    ) {
      swordClash.play()
    }

    displayTextLvl.classList.add('visible')
  }, 1000)
})

heroForm.addEventListener('input', reactToHeroFormValidity)

function openModal() {
  fieldSet.disabled = true

  modal.classList.add('visible')

  modalContent.classList.add('opening')

  setTimeout(() => {
    modalContent.classList.remove('opening')

    document.body.classList.add('modal-open')

    modal.addEventListener('click', ifBackdropCloseModal)
    closeModalBtn.addEventListener('click', closeModal)
  }, 300)
}

function closeModal() {
  swordSlash.play()

  fieldSet.disabled = false

  modalContent.classList.add('closing')

  setTimeout(() => {
    modalContent.classList.remove('closing')

    modal.classList.remove('visible')

    closeModalBtn.removeEventListener('click', closeModal)
    modal.removeEventListener('click', ifBackdropCloseModal)

    document.body.classList.remove('modal-open')

    displayTextHero.textContent = ''
    displayTextLvl.textContent = ''
    displayTextLvl.classList.remove('visible')
  }, 300)
}

function ifBackdropCloseModal(event) {
  event.target === modalBackdrop && closeModal()
}

function reactToHeroFormValidity() {
  const formValid = heroForm.checkValidity()

  if (formValid) {
    if (!heroFormStillValid) {
      bladeDraw.play()
    }

    mainBtn.classList.add('valid')

    heroFormStillValid = true
  } else {
    mainBtn.classList.remove('valid')

    heroFormStillValid = false
  }
}
