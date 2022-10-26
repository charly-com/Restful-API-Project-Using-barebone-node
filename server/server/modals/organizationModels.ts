let Organization = require('../../data/organization');
import { join } from "node:path";
import fs from "node:fs"
import {getPostData, objInterface, writeDataToFile} from "../utils"
//const {writeDataToFile} = require('../utils')

console.log(typeof Organization)
export function findAll(){
    return new Promise((resolve, reject) => {
        resolve(Organization)
    })
}
export function findById(id:number): Promise<objInterface>{
    return new Promise((resolve, reject) => {
        const organization = Organization.find((p: objInterface) => p.id === id)
        resolve(organization) 
    })
}
export function create(data:objInterface){
    let id = Organization.length + 1
    return new Promise((resolve, reject) => {
       const newOrganization = {id: id, ...data}
       Organization.push(newOrganization);
       fs.writeFileSync(join(__dirname, '../../data/organization.json'),JSON.stringify(Organization), {
        flag: 'w',
       })
       resolve(newOrganization)
    })
}
export function update(id:number, organization:objInterface){
    return new Promise((resolve, reject) => {
        const index = Organization.findIndex((p: objInterface) => p.id === id)
        Organization[index] = { id, ...organization}
       fs.writeFileSync(join(__dirname, '../../data/organization.json'),JSON.stringify(Organization[index]))
       resolve(Organization)

    })
}
export function remove(id:number){
    return new Promise((resolve, reject) => {
        Organization = Organization.filter((p: objInterface) => p.id !== id)
       fs.writeFileSync(join(__dirname, '../data/organization.json'), JSON.stringify(Organization))
       resolve(Organization)

    })
}
