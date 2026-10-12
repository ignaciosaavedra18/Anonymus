// Carga todos los archivos de src para que la cobertura cuente también los que no tienen pruebas.
const contexto = require.context('..', true, /^\.\/(components|pages|services|data)\/.*\.jsx?$/)
contexto.keys().forEach(contexto)