import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())

app.use(express.static('dist'))

app.use(cors())

app.get('/devices', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        res.json(JSON.parse(data))
    })
})

app.get('/devices/:id', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        const devices = JSON.parse(data)
        const device = devices.find(d => d.id === req.params.id)
        if (!device) {
            return res.status(404).json({ message: 'Device not found' })
        }
        res.json(device)
    })
})

app.post('/devices', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        const devices = JSON.parse(data)
        devices.push(req.body)
        fs.writeFile('devices.json', JSON.stringify(devices), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' })
            }
            res.status(201).json(req.body)
        })
    })
})

app.put('/devices/:id', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        let devices = JSON.parse(data)
        const index = devices.findIndex(d => d.id === req.params.id)
        if (index === -1) {
            return res.status(404).json({ message: 'Device not found' })
        }
        devices[index] = req.body
        fs.writeFile('devices.json', JSON.stringify(devices), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' })
            }
            res.json(req.body)
        })
    })
})

app.delete('/devices/:id', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        let devices = JSON.parse(data)
        devices = devices.filter(d => d.id !== req.params.id)
        fs.writeFile('devices.json', JSON.stringify(devices), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' })
            }
            res.status(204).end()
        })
    })
})

app.post('/devices/:id/history', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        let devices = JSON.parse(data)
        const index = devices.findIndex(d => d.id === req.params.id)
        if (index === -1) {
            return res.status(404).json({ message: 'Device not found' })
        }
        const history = req.body
        history.uuid = uuidv4()
        devices[index].history.push(history)
        fs.writeFile('devices.json', JSON.stringify(devices), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' })
            }
            res.json(req.body)
        })
    })
})

app.delete('/devices/:deviceId/history/:historyUUID', (req, res) => {
    fs.readFile('devices.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' })
        }
        let devices = JSON.parse(data)
        const index = devices.findIndex(d => d.id === req.params.deviceId)
        if (index === -1) {
            return res.status(404).json({ message: 'Device not found' })
        }
        devices[index].history = devices[index].history.filter(h => h.uuid !== req.params.historyUUID)
        fs.writeFile('devices.json', JSON.stringify(devices), err => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' })
            }
            res.json(req.body)
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16))
}
