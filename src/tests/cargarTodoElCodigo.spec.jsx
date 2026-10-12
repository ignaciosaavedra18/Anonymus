const contexto = require.context('..', true, /^\.\/(components|pages|services|data)\/.*\.jsx?$/)
contexto.keys().forEach(contexto)