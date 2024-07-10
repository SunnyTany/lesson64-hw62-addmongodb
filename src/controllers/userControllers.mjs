import { ObjectId } from 'mongodb'
import { connectDB } from '../db/db.mjs'

export const getLoginPage = (req, res) => {
  if ( req.isAuthenticated() ) {
    res.redirect('/protected')
  } else {
    res.render('login')
  }
}

export const getProtectedPage = (req, res) => {
  if ( req.isAuthenticated() ) {
    resres.render('protected', { title: 'PROTECTED PAGE' })
  } else {
    res.redirect('/')
  }
}

export const getAuthRedirect = (req, res) => {
  if ( req.isAuthenticated() ) {
    res.render('protected', { title: 'PROTECTED PAGE' })
  } else {
    res.redirect('/login')
  }
}

export const createUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const user = await users.insertOne(req.body)
    res.status(201).render('users', users)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const usersList = await users.find({}).toArray()
    res.status(200).render('users', { users: usersList })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const result = await users.deleteOne({ _id: new ObjectId(req.params.id) })

    console.log(result)
    if (result.deletedCount === 0) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(`User with id ${req.params.id} deleted`)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const db = await connectDB()
    const users = db.collection('users')
    const userId = req.params.id
    const updatedData = req.body
    const result = await users.updateOne({ _id: new ObjectId(userId) }, { $set: updatedData })
    if (result.matchedCount === 0) {
      return res.status(404).send('User not found')
    }
    res.status(200).send(`User with id ${userId} updated`)
  } catch (error) {
    next(error)
  }
}
