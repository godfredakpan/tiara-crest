import { query, Client, Collection } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getAllProperties = async () => {
    const q = query
    const { Documents, Paginate, Collections, Lambda, Get } = q

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const propQuery = client.query(
        q.Map(
            Paginate(Documents(Collection('properties'))),
            Lambda(x => Get(x)))

    )
    .then((ret) => { return ret.data })
    .catch((err) => {
        return null
    }
    )

    if (!propQuery || propQuery === undefined) return null

    return propQuery

}

export default getAllProperties