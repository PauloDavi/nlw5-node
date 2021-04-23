import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'
import { MessagesController } from './controllers/MessagesController'

const routes = Router()

// Controllers
const userController = new UsersController()
const settingsController = new SettingsController()
const messagesController = new MessagesController()

// Settings
routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.findByUserName)
routes.put('/settings/:username', settingsController.update)

// Users
routes.post('/users', userController.create)

// Messages
routes.post('/messages', messagesController.create)
routes.get('/messages/:user_id', messagesController.showByUser)

export { routes }
