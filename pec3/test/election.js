const election = artifacts.require("./Election.sol");
const sigUtil = require('eth-sig-util');
const fromAddress = "0xde958337b3d1c692078282aa6790cd4a0ce454c1";
const signature = '0xb1b7b30eb3a4aef5dbe93de1ad9c05d9cff8a46f7eb844bf9d02caf64fb4610b1fbae9016f36ce0f9f28e4214617f60bbcb1019eaa5f146108a0690e92f7a54e1c';
/**
 * @title Test para el contrato Election
 */
contract("Election", function (accounts) {
	let electionInstance = null;
	
	var c1 = "CNCO";
	var c2 = "Luis Fonzi";
	var c3 = "Daddy Yankee";
	var c4 = "Maluma";
	var c5 = "Ozuna";

	var h1 = sigUtil.typedSignatureHash([{
		type: 'string',
		name: 'Mensaje',
		value: 'Votar a ' + c1
	}]);
	var h2 = sigUtil.typedSignatureHash([{
		type: 'string',
		name: 'Mensaje',
		value: 'Votar a ' + c2
	}]);
	var h3 = sigUtil.typedSignatureHash([{
		type: 'string',
		name: 'Mensaje',
		value: 'Votar a ' + c3
	}]);
	var h4 = sigUtil.typedSignatureHash([{
		type: 'string',
		name: 'Mensaje',
		value: 'Votar a ' + c4
	}]);
	var h5 = sigUtil.typedSignatureHash([{
		type: 'string',
		name: 'Mensaje',
		value: 'Votar a ' + c5
	}]);

	/**
	 * @dev Acciones previas a cada test
	 */
	beforeEach('setup contracto para cada test', function () {
		// El contrato persiste los hash pre-cargados de los candidatos para validarlo en la votación
		electionInstance = election.new([c1, c2, c3, c4, c5], [h1, h2, h3, h4, h5]);
	});

	/**
	 * @dev Tests de validación de datos: cantidad de candidatos, cantidad de votos en 0, hash de los candidatos
	 */
	describe('Test de datos', function () {

		/**
		 * @dev Test de validación de inicialización del contrato con 5 candidatos.
		 */
		it("Validación de Inicialización con un total de 5 candidatos", function () {
			return election.deployed().then(function (instance) {
				return instance.contadorCandidatos();
			}).then(function (count) {
				assert.equal(count, 5);
			});
		});

		/**
		 * @dev Test de verificación del hash que se genera para el candidato C1
		 */
		it("Verificación de generación del hash para el candidato " + c1, function () {
			return election.deployed().then(function (instance) {
				assert.equal(h1, "0x25efb418b2e0aa780eed77dfeddcb97d6e34911b6baee0ff3a5fa0633ea644d0");
			})
		});

		/**
		 * @dev Test de verificación del hash que se genera para el candidato C2
		 */
		it("Verificación de generación del hash para el candidato " + c2, function () {
			return election.deployed().then(function (instance) {
				assert.equal(h2, "0xab78a30e0366f49a24e85184e17a159d14bcf253f454db2acd64c43854a80913");
			})
		});

		/**
		 * @dev Test de verificación del hash que se genera para el candidato C3
		 */
		it("Verificación de generación del hash para el candidato " + c3, function () {
			return election.deployed().then(function (instance) {
				assert.equal(h3, "0xfc3ca02283e7ee733cf4cf4397075bb9498b4ff0d2d26368177ffd78febde0c4");
			})
		});

		/**
		 * @dev Test de verificación del hash que se genera para el candidato C4
		 */
		it("Verificación de generación del hash para el candidato " + c4, function () {
			return election.deployed().then(function (instance) {
				assert.equal(h4, "0xed69d52944c6c9a7a2eec9db66fc249ac30e157078d696c2862e4f41276ccdb7");
			})
		});

		/**
		 * @dev Test de verificación del hash que se genera para el candidato C5
		 */
		it("Verificación de generación del hash para el candidato " + c5, function () {
			return election.deployed().then(function (instance) {
				assert.equal(h5, "0x819ad99f0593265c75df81d9858c9fe1ffb335cb641077a3ea9fd01b404916b3");
			})
		});

		/**
		 * @dev Test de verificación de la cantidad inicial de votos del candidato C1
		 */
		it("Verificación de que el candidato " + c1 + ", inicie con 0 (cero) votos", function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				return electionInstance.getVotesByCandidate.call(c1).then(function (votos) {
					assert.equal(votos, 0);
				});
			});
		});

		/**
		 * @dev Test de verificación de la cantidad inicial de votos del candidato C2
		 */
		it("Verificación de que el candidato " + c2 + ", inicie con 0 (cero) votos", function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				return electionInstance.getVotesByCandidate.call(c2).then(function (votos) {
					assert.equal(votos, 0);
				});
			});
		});

		/**
		 * @dev Test de verificación de la cantidad inicial de votos del candidato C3
		 */
		it("Verificación de que el candidato " + c3 + ", inicie con 0 (cero) votos", function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				return electionInstance.getVotesByCandidate.call(c3).then(function (votos) {
					assert.equal(votos, 0);
				});
			});
		});

		/**
		 * @dev Test de verificación de la cantidad inicial de votos del candidato C4
		 */
		it("Verificación de que el candidato " + c4 + ", inicie con 0 (cero) votos", function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				return electionInstance.getVotesByCandidate.call(c4).then(function (votos) {
					assert.equal(votos, 0);
				});
			});
		});

		/**
		 * @dev Test de verificación de la cantidad inicial de votos del candidato C5
		 */
		it("Verificación de que el candidato " + c5 + ", inicie con 0 (cero) votos", function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				return electionInstance.getVotesByCandidate.call(c5).then(function (votos) {
					assert.equal(votos, 0);
				});
			});
		});

	});

	/**
	 * @Dev Test de funcionalidades del contrato Election
	 */
	describe('Test de funcionalidades', function () {

		/**
		 * @Dev Validación de votación para el candidato 1
		 * @Dev El candidato arranca con cero votos, por lo que luego de la
		 * @dev votación, debería quedar con un voto
		 */
		it("Verificación de votación válida para candidato " + c1, function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;

				return electionInstance.vote(c1, fromAddress, signature, {
					gas: 125000,
					from: accounts[0]
				});
			}).then(function (receipt) {
				// Debería aumentar en 1 la cantidad de votos del candidato 1
				return electionInstance.getVotesByCandidate(c1);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c1} (debería ser 1): ${votos}`);
				assert.equal(votos, 1, "La cantidad de votos del candidato " + c1 + ", debería ser igual a 1");
				return electionInstance.getVotesByCandidate(c2);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c2} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c2 + ", debería ser igual a 0");
				return electionInstance.getVotesByCandidate(c3);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c3} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c3 + ", debería ser igual a 0");
				return electionInstance.getVotesByCandidate(c4);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c4} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c4 + ", debería ser igual a 0");
				return electionInstance.getVotesByCandidate(c5);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c5} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c5 + ", debería ser igual a 0");
			});
		});


		/**
		 * @Dev Validación de lanzamiento de excepción por intento de votación doble
		 */
		it("Verificación de error por intento de votación doble", function () {
			return election.deployed().then(function (instance) {
			electionInstance = instance;

			// El candidato C1 tienen un voto del test anterior

			}).then(function (receipt) {
				return electionInstance.getVotesByCandidate(c1);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c1} (debería ser 1): ${votos}`);
				assert.equal(votos, 1, "La cantidad de votos del candidato " + c1 + ", debería ser igual a 1");
				return electionInstance.getVotesByCandidate(c2);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c2} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c2 + ", debería ser igual a 0");
				return electionInstance.getVotesByCandidate(c3);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c3} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c3 + ", debería ser igual a 0");
				return electionInstance.getVotesByCandidate(c4);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c4} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c4 + ", debería ser igual a 0");
				return electionInstance.getVotesByCandidate(c5);
			}).then(function (votos) {
				console.log(`\tCantidad votos candidato ${c5} (debería ser 0): ${votos}`);
				assert.equal(votos, 0, "La cantidad de votos del candidato " + c5 + ", debería ser igual a 0");

				// intento de segunda votación para el mismo candidato con la misma cuenta
				console.log(`\tSegunda votación de candidato: ${c1} (debería fallar)`);
				return electionInstance.vote(c1, fromAddress, signature, {
					gas: 125000,
					from: accounts[0]
				});

			}).then(assert.fail).catch(function (error) {
				console.log(`\tEl mensaje de error tiene que tener la palabra 'revert': ${error}`);
				assert(error.message.indexOf('revert') >= 0, "El mensaje de error no contiene la palabra 'revert'");
			});
		});

	});


	/**
	 * @Dev Test de funcionalidades de "ownable contract"
	 */
	describe('Test de la implementación de restricciones (onlyOwner, stopInEmergency, Pausable)', function () {

		/**
		 * @dev Test de restricción de modificador 'onlyOwner'
		 */
		it("Test de restricción 'onlyOwner()'", async () => {
			let owner = accounts[0]
			let account = accounts[1]

			try {
				let result = await electionInstance.restrictedFunction.call({
					// Se desplegó el contrato con la cuenta 0, se
					// prueba funcionalidad ocn la cuenta 1 (que debería fallar)
					from: account
				})
				assert.equal(result.toString(), owner)
			} catch (e) {
				console.log(`\ttest correcto: La cuenta ${account} no es el owner del contrato`)
			}
		})

		/**
		 * @dev Test de restricción de modificador 'stopInEmergency'
		 */
		it("Test de restricción 'stopInEmergency()'", async () => {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				console.log(`\tSe detiene el contrato por emergencia`)
				return electionInstance.toggleContractActive({
					from: accounts[0]
				});
			}).then(function (receipt) {
				console.log(`\tCon el contrato detenido, se intenta hacer una votación`)

				return electionInstance.vote(c3, fromAddress, signature, {
					gas: 125000,
					from: accounts[0]
				});
			}).then(assert.fail).catch(function (error) {
				assert(error.message.indexOf('assert') >= 0, "El mensaje de error no contiene la palabra 'assert'");
			});
		})

		/**
		 * @dev Test de verificación de contrato pausado
		 */
		it("Test de restricción de contrato pausado", function () {
			return election.deployed().then(function (instance) {
				electionInstance = instance;
				console.log(`\tSe pausa el contrato`)
				return electionInstance.pause({
					from: accounts[0]
				});
			}).then(function (receipt) {
				// intento de votación con contrato pausado
				console.log(`\tIntento de votación con contrato pausado (debería fallar)`);
				return electionInstance.vote(c1, fromAddress, signature, {
					gas: 125000,
					from: accounts[0]
				});
			}).then(assert.fail).catch(function (error) {
				assert(error.message.indexOf('assert') >= 0, "El mensaje de error no contiene la palabra 'assert'");
			});
		})

	});

});