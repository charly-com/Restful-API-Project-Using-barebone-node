import  { IncomingMessage, ServerResponse } from "http";
import  {findAll, findById, create, update, remove}  from "../modals/organizationModels";
import {getPostData, objInterface} from "../utils"

//import Organization from '../models/organizationModels';

async function getOrgans(req:IncomingMessage, res:ServerResponse){
    try{
        const organizations = await findAll()
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(organizations))

    }catch(error){
        console.log(error)
    }
}
//get single ORGANIZATION
export async function getOrgan(req:IncomingMessage, res:ServerResponse, id: number){
    try{
        const organization = await findById(id)

        if(!organization){
            res.writeHead(404, {'Content-Type': "application/json"})
            res.end(JSON.stringify({message: "Organization not found"}))
        }
        else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(organization))
        }

    }catch(error){
        console.log(error)
    }
}

//create organization (POST)
export async function createOrganization(req:IncomingMessage, res:ServerResponse, data:objInterface){
    try{
        // const body: any = await getPostData(req)


        const {name, createdAt, updatedAt, products, marketValue, address, ceo, country, noOfEmployees, employees} = data;

        const organization = {
            name,
            createdAt,
            updatedAt,
            products,
            marketValue,
            address,
            ceo,
            country,
            noOfEmployees,
            employees
        }

        const newOrganization = await create(organization)
        res.writeHead(201, {'Content-Type': 'application'})

        return res.end(JSON.stringify(newOrganization))

    }catch(error){
        console.log(error)
    }
}
//update an organization(PUT)
export async function updateOrganization(req:IncomingMessage, res:ServerResponse, id:number){
    try{
        const organization = await findById(id)

        if(!organization) {
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            const body: any = await getPostData(req)

            const {name, createdAt, updatedAt, products, marketValue, address, ceo, country, noOfEmployees, employees} = JSON.parse(body)

            const organizationData: objInterface = {
            name: name || organization.name,
            createdAt: createdAt || organization.createdAt,
            updatedAt: updatedAt || organization.updatedAt,
            products: products || organization.products,
            marketValue: marketValue || organization.marketValue,
            address: address || organization.address,
            ceo: ceo || organization.ceo,
            country: country || organization.country,
            noOfEmployees: noOfEmployees || organization.noOfEmployees,
            employees: employees || organization.employees
        }

            const updateOrganization = await update(id, organizationData)
            res.writeHead(201, {'Content-Type': 'application'})

            return res.end(JSON.stringify(updateOrganization))
    }

    }catch(error){
        console.log(error)
    }
}

//delete organization
export async function deleteOrganization(req:IncomingMessage, res:ServerResponse, id: number){
    try{
        const organization = await findById(id)

        if(!organization){
            res.writeHead(404, {'Content-Type': "application/json"})
            res.end(JSON.stringify({message: "Organization not found"}))
        }
        else{
            await remove(id)
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({message: `organization ${id} removed`}))
        }

    }catch(error){
        console.log(error)
    }
}


export default getOrgans





