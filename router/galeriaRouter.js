var express = require('express');
var router = express.Router();

var fs = require('fs');
var pastaPublica = "./public/imagens/"

var GaleriaModel = require('../model/galeria/galeriaModel');
var RespostaClass = require('../model/RespostaClass');

router.get("/", (req, resp, next) => {
    GaleriaModel.findAll((error, retorno) => {
        let resposta = new RespostaClass();
        if(error) {
            resposta.error = true;
            resposta.message = "Erro ao buscar galerias.";
        } else {
            resposta.error = false;
            resposta.data = retorno;
        }

        resp.json(resposta);
    });
});

router.get("/:id?", (req, resp, next) => {
    GaleriaModel.findById(req.params.id, (error, retorno) => {
        let resposta = new RespostaClass();
        if(error) {
            resposta.error = true;
            resposta.message = "Erro ao buscar uma galeria.";
        } else {
            resposta.error = false;
            resposta.data = retorno;
        }
        resp.json(resposta);
    });
});

router.post("/", (req, resp, next) => {
    let resposta = new RespostaClass();
    let body = req.body;

    if(body.dados_imagem != null) {
        // convertendo base64 para imagem.
        //let bitman = new Buffer(body.dados_imagem.imagem_base64, 'base64');
        let bitman = Buffer.from(body.dados_imagem.imagem_base64, 'base64');

        let dataAtual = new Date().toLocaleString().replace(/\//g, '')
            .replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        let nomeImagemCaminho = pastaPublica + dataAtual + body.dados_imagem.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitman);

        body.caminho = nomeImagemCaminho;

        GaleriaModel.save(body, (error, retorno) => {
            if(error) {
                resposta.error = true;
                resposta.message = "Erro ao salvar galerias.";
            } else {
                if (retorno.affectedRows > 0) {
                    resposta.message = "Cadastro realizado com sucesso.";
                } else {
                    resposta.error = true;
                    resposta.message = "Não foi possivel salvar a galeria.";
                }
            }

            resp.json(resposta);
        });
    } else {
        resposta.error = true;
        resposta.message = "Imagem nao informada.";
        resp.json(resposta);
    }
});
module.exports = router;