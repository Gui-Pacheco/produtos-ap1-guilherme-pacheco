let produtos = []
let nextId = 1

function listar(req, res) {
  res.status(200).json(produtos)
}

function buscarPorId(req, res) {
  const id = parseInt(req.params.id)

  const produto = produtos.find(p => p.id === id)

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" })
  }

  res.status(200).json(produto)
}

function criar(req, res) {
  const { nome, descricao, preco, categoria, estoque } = req.body

  if (!nome) return res.status(400).json({ erro: "O campo 'nome' é obrigatório" })
  if (!descricao) return res.status(400).json({ erro: "O campo 'descricao' é obrigatório" })
  if (!preco) return res.status(400).json({ erro: "O campo 'preco' é obrigatório" })
  if (!categoria) return res.status(400).json({ erro: "O campo 'categoria' é obrigatório" })
  if (estoque === undefined) return res.status(400).json({ erro: "O campo 'estoque' é obrigatório" })

  const produto = {
    id: nextId++,
    nome,
    descricao,
    preco,
    categoria,
    estoque,
    ativo: true,
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString()
  }

  produtos.push(produto)

  res.status(201).json(produto)
}

function atualizar(req, res) {
  const id = parseInt(req.params.id)

  const index = produtos.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" })
  }

  const produtoAntigo = produtos[index]

  const atualizado = {
    ...produtoAntigo,
    ...req.body,
    id: produtoAntigo.id,
    criado_em: produtoAntigo.criado_em,
    atualizado_em: new Date().toISOString()
  }

  produtos[index] = atualizado

  res.status(200).json(atualizado)
}

function remover(req, res) {
  // TODO
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
}