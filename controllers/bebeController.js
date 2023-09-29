import { Bebe } from "../models/Bebe.js"
import { Mae } from "../models/Mae.js"
import { Medico } from "../models/Medico.js"

//função de get - vai listar os bebês no insomnia
export async function bebesIndex(req, res) {
    try {
        const bebes = await Bebe.findAll({
            include: [Mae, Medico], //aqui lista os bebês e já inclui a sua mãe e o médico
        })
        res.status(200).json(bebes)
    } catch (error) {
        res.status(400).send(error)
    }
}

//função create de bebês
export async function bebeCreate(req, res) {
    const { nome, data_nasc, peso, altura, mae_id, medico_id } = req.body

    if (!nome || !data_nasc || !peso || !altura || !mae_id || !medico_id ){
        res.status(400).json("Erro... Informe todos os atributos do bebê.")
        return
    }

    try {
        const bebe = await Bebe.create({
            nome, data_nasc, peso, altura, mae_id, medico_id
        })
        res.status(201).json(bebe)
    } catch (error) {
        res.status(400).send(error)
    }
}
