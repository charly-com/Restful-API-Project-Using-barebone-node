import { rejects } from "node:assert"
import { resolve } from "node:path"

const fs = require('fs')
const database = './database.json';

export function writeDataToFile(filename:string, content:string){
    if(!fs.existSync(filename)){
        fs.writeFile(database, JSON.stringify([content], null, 2), (err:any) => {
            if(err) throw err;
            console.log('database created')
        })
        return;
    }

    fs.readFile(database, 'utf-8', (err:any, fileContent:any) => {
        let database = JSON.parse(fileContent);

        database= database.push(JSON.parse(content))

        fs.writeFile(filename, JSON.stringify(database, null, 2), (err:any) => {
            if(err) throw err;
            console.log('database updated')
        })
    })
    


}

export function getPostData(req:any){
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (chunk:any) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve (body)
            })
            
        }catch(error){
           reject (error) 
        }
    })
   
}
export interface objInterface {
    [key: string]: number | string | string[]
}