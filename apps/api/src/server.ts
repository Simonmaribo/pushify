require('dotenv').config({ path: `./.env.local`, overwrite: true })
require('dotenv').config()

import amqplib from 'amqplib'

import express from 'express'
import type { Request, Response } from 'express'
import http from 'http'
const app = express()
const httpServer = http.createServer(app)

import bodyParser from 'body-parser'
import cron from 'node-cron'
import rateLimit from 'express-rate-limit'

app.set('trust proxy', 2)

app.use(
	bodyParser.json({
		verify: (
			req: Request,
			res: Response,
			buf: Buffer,
			encoding: string
		) => {
			var url = req.originalUrl
			if (url.startsWith('/stripe')) {
				// @ts-ignore
				req.rawBody = buf.toString()
			}
		},
	})
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use((req: Request, res: Response, next: any) => {
	// Dont set CORS headers for the API
	if (req.originalUrl.startsWith('/v1')) {
		res.header('Access-Control-Allow-Origin', '*')
		res.header(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization, X-Requested-With, Content-Length, X-Requested-Width, Accept, Access-Control-Allow-Credentials'
		)
		next()
		return
	}

	if (process.env.NODE_ENV == 'development') {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	} else {
		res.header(
			'Access-Control-Allow-Origin',
			`${process.env.FRONTEND_DOMAIN}`
		)
	}

	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, X-Requested-With, Content-Length, X-Requested-Width, Accept, Access-Control-Allow-Credentials'
	)
	res.header('Access-Control-Allow-Credentials', 'true')
	if (req.method === 'OPTIONS') res.sendStatus(200)
	else next()
})

app.use(require('cookie-parser')())
app.use(require('express-device').capture())

app.use(require('./helpers/logger/morgan'))

import { getFiles, loadFile, getRouteName } from './helpers/files'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import type Task from './interfaces/Task'
import type Server from './interfaces/Server'
import type Route from './interfaces/Route'

import AuthController from './controllers/AuthController'
import Stripe from 'stripe'
import PushController from './controllers/PushController'
;(async () => {
	console.log('\x1b[32mstart\x1b[0m Express Server')
	console.log('\x1b[32mstart\x1b[0m Prisma Client')
	await prisma.$connect()

	const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
		apiVersion: '2024-04-10',
	})

	// Create the server
	const server: Server = {
		database: prisma,
		environment:
			process.env.NODE_ENV == 'production' ? 'production' : 'development',
		authManager: new AuthController(prisma),
		pushController: new PushController(prisma),
		stripe: stripe,
	}

	// Load routes
	console.log()
	console.log('\x1b[36mi' + '\x1b[0m Loading routes')

	var routePaths = getFiles({
		dirPath: `${__dirname}/routes`,
		extension: ['.ts', '.js'],
		excludeIfStartsWith: '_',
	})

	routePaths.sort((a, b) => {
		let aSplit = a.split('/')
		let bSplit = b.split('/')
		let aLength = aSplit.length
		let bLength = bSplit.length
		let minLength = Math.min(aLength, bLength)
		for (let i = 0; i < minLength; i++) {
			if (aSplit[i].startsWith(':') && !bSplit[i].startsWith(':'))
				return 1
			if (!aSplit[i].startsWith(':') && bSplit[i].startsWith(':'))
				return -1
		}
		return aLength - bLength
	})

	for (var i = 0; i < routePaths.length; i++) {
		var routePath = routePaths[i]
		let route = loadFile<Route>(`${routePath}`, server)
		let routeName = getRouteName(
			routePath.replace(`${__dirname}/routes`, '')
		)
		let router = route.router()
		if (route.rateLimit) {
			var rateLimiter = rateLimit({
				windowMs: route.rateLimit.timePeriod * 1000,
				max: route.rateLimit.max,
				message: 'Too many requests, please try again later',
			})
			app.use(routeName, rateLimiter, router)
		} else {
			var rateLimiter = rateLimit({
				windowMs: 60 * 1000,
				max: 1000,
				message: 'Too many requests, please try again later',
			})
			app.use(routeName, rateLimiter, router)
		}
	}

	// Load the tasks
	console.log('\x1b[36mi' + '\x1b[0m Loading tasks')
	var taskPaths = getFiles({
		dirPath: `${__dirname}/tasks`,
		extension: ['.ts', '.js'],
	})
	for (var i = 0; i < taskPaths.length; i++) {
		var taskPath = taskPaths[i]
		let task = loadFile<Task>(`${taskPath}`, server)
		if (task.enabled) cron.schedule(task.cron, async () => await task.run())
		console.log(
			'\x1b[2m' +
				(i == taskPaths.length - 1 ? '└─ ' : '├─ ') +
				'\x1b[0m' +
				task.name +
				(task.enabled
					? ` \x1b[32m(${task.cron})`
					: ' \x1b[31m(disabled)\x1b[0m')
		)
	}
	httpServer.listen(process.env.PORT, () => {
		console.log()
		console.log(
			'\x1b[32m√' +
				'\x1b[0m' +
				' Express server is running on \x1b[36m' +
				'http://localhost:' +
				process.env.PORT +
				` (ENV: ${process.env.NODE_ENV})` +
				'\x1b[0m'
		)
	})

	process.on('uncaughtException', function (err) {
		console.error(err)
		console.log('Node NOT Exiting...')
	})
})()
