const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input')
const subjectInput = document.querySelector('.subject-input')
const messageInput = document.querySelector('.message-input')
const form = document.querySelector('.form')
const btn = document.querySelector('.submit-btn')
const alert = document.querySelector('.alert')
const title = document.querySelector('.title')
alert.style.display = 'none'

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  btn.innerHTML = `<span class="sending"></span>`
  btn.disabled = true
  alert.style.display = 'none'
  const emailInfo = {
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value,
  }

  try {
    await axios.post('/api/7-email', { ...emailInfo })
    nameInput.value = ''
    emailInput.value = ''
    subjectInput.value = ''
    messageInput.value = ''
    title.textContent = 'Message sent'
    setTimeout(() => {
      title.textContent = 'Send a message '
    }, 3000)
  } catch (error) {
    console.log(error.response)
    alert.style.display = 'block'
    alert.textContent = error.response.data
  }
  btn.innerHTML = 'send'
  btn.disabled = false
})
