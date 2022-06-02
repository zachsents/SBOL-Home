
/*
*   Live readout for waiting, active, and completed jobs.
*   Intended to be ran inside Watcher container.
*/

import db from './mongo.js'

const statuses = ['waiting', 'active', 'complete']

let col = db.collection('jobs')

// Interval to update data
export default () => {
    setInterval(async () => {
        console.log((await Promise.all(
            statuses.map(async status =>
                `${status[0]}: ${await col.countDocuments({ status })}`
            )
        )).join('\t'))
    }, 1000)
}
