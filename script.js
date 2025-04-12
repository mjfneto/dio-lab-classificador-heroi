const heroForm = document.getElementById('hero-form')
const fieldSet = heroForm.querySelector('fieldset')
const modal = document.getElementById('modal')
const shieldBlock = document.getElementById('shield-block')
const swordClash = document.getElementById('sword-clash')
const swordImpact = document.getElementById('sword-impact')
const swordSlash = document.getElementById('sword-slash')

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

  fieldSet.disabled = true

  modal.classList.add('visible')

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

    modal.insertAdjacentHTML(
      'beforeend',
      `
          <div id="modal-content">
              <div class="centered-content">
                <p>O herói de nome 
                  <strong class="display-text">${hero}</strong>
                  está no nível
                  <strong class="display-text">${lvl}</strong>
                </p>
                <button id="close-modal-btn" aria-label="Close modal">
                  <img src="/assets/images/ChatGPT Image Apr 11, 2025, 09_05_08 PM.png" alt="" aria-hidden="true" />
                  <span>🗙</span>
                </button>
              </div>
          </div>
      `
    )

    modal.addEventListener('click', ifModalCloseModal)
    document
      .getElementById('close-modal-btn')
      .addEventListener('click', closeModal)
  }, 1000)
})

function closeModal() {
  fieldSet.disabled = false
  swordSlash.play()

  modal.classList.remove('visible')

  const modalContent = document.getElementById('modal-content')
  modalContent && modal.removeChild(modalContent)

  modal.removeEventListener('click', ifModalCloseModal)
  document
    .getElementById('close-modal-btn')
    .removeEventListener('click', closeModal)
}

function ifModalCloseModal(event) {
  event.target.id == 'modal' && closeModal()
}
