/* eslint-disable no-undef */
document.querySelector('#start_chat').addEventListener('click', () => {
  const socket = io()

  const chat_help = document.getElementById('chat_help')
  chat_help.style.display = 'none'

  const chat__in_support = document.getElementById('chat_in_support')
  chat__in_support.style.display = 'block'

  const email = document.getElementById('email').value
  const text = document.getElementById('txt_help').value

  const params = {
    email,
    text,
  }

  socket.on('connect', () => {
    socket.emit('client_first_access', params, (call, err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(call)
      }
    })
  })
})
