pragma solidity ^0.4.24;

import "./Destructible.sol";
import "/openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "/openzeppelin-solidity/contracts/introspection/ERC165.sol";
import "/openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
  * @title Contrato "Election"
	*
  * @dev Se implementa Destructible de OpenZeppeling: para permitir destruir el contrato en caso de error.
	*
	* @dev Se implementa Ownable de OpenZeppeling(a través de Destructible): que permite establecer una única
  * @dev dirección con privilegios de administración que pueda llamar a "owner-specific functions".
  * @dev (provee el modificar "onlyOwner" que garantiza que las funciones puedan solo ser llamadas por
  * @dev el owner del contrato). A su vez, se permite transferir el contrato a otro dueño.
	*
	* @dev Se implementa Pausable: para permitir pausar el contrato en caso que haga falta.
	*
  * @dev Se implementa ERC165: para permitir hacer una introspección de las interfaces usadas
  * @dev por el contrato.
	*
	* @dev Se hace uso de safeMath para uint8, para evitar un overFlow de la variable _votosRecibidos
	* 
	* @dev crédito y referencia de implementación circuit-breaker:
	* see https://github.com/ethereum/wiki/wiki/Safety#circuit-breakers-pause-contract-functionality
  */
contract Election is Pausable, Destructible, ERC165 {
  using ECDSA for bytes32;
	using SafeMath for uint8;

  mapping(bytes32 => uint8) public _votosRecibidos;
  mapping(bytes32 => bytes32) public _hashCandidatos;
  mapping(address => bool) public _statusVotador;
  mapping(bytes32 => bool) public _candidatosValidos;

	// Constante para validación con ERC165 de la propia interfaz ERC165
	// 0x01ffc9a7 === bytes4(keccak256("supportsInterface(bytes4)"));
	bytes4 private constant _InterfaceId_ERC165 = 0x01ffc9a7;

	// Constante para validación con ERC165 de la interfaz Ownable
	bytes4 private constant _InterfaceId_ownable = bytes4(keccak256("owner()"))^bytes4(keccak256("isOwner()"))^bytes4(keccak256("renounceOwnership()"))^bytes4(keccak256("deedOfOwnerByIndex(address)"))^bytes4(keccak256("transferOwnership(address)"));

	// Constante para validación con ERC165 de la interfaz Pausable
	bytes4 private constant _InterfaceId_pausable = bytes4(keccak256("pause()"))^bytes4(keccak256("unpause()"));

	// Constante para validación con ERC165 de la interfaz Destructible
	bytes4 private constant _InterfaceId_destructible = bytes4(keccak256("destroy()"))^bytes4(keccak256("destroyAndSend(address)"))^bytes4(keccak256("getOwner()"));

	// Almacena el contador de candidatos
	uint public contadorCandidatos;

	// Usado para detener el contrato (parte de implementación de circuit-breakers)
	bool private stopped = false;

  /**
		* @dev Constructor
		* @param nombreCandidatos Nombre de los candidatos
		* @param hashCandidatos Hash de los candidatos
		*/
	constructor (bytes32[] nombreCandidatos, bytes32[] hashCandidatos) public {
    for (uint i = 0; i < nombreCandidatos.length; i++) {
			contadorCandidatos ++;
      _candidatosValidos[nombreCandidatos[i]] = true;
      _hashCandidatos[nombreCandidatos[i]] = hashCandidatos[i];
    }
  }

	/**
		* @dev Cambiar un flag (stopped) en caso de algun error que requiera la 
		* @dev implementación de detención de código (circuit-breaker)
		* @dev Hace uso del modificador 'onlyOwner' de la interfaz @Ownable
		*/
	function toggleContractActive() onlyOwner public
	{
		stopped = !stopped;
	}

	/**
		* @dev Implementación de modificador para detener la ejecución de una función
		* @dev en caso de emergencia
	  */
	modifier stopInEmergency { if (!stopped) _; }

	/**
		* @dev Implementación de modificador para ejecución de una función solo en caso
		* @dev de emergencia
		* @dev por el momento, modificador no utiliza den alguna función
		*/
	modifier onlyInEmergency { if (stopped) _; }


  /**
		* @dev Obtención de la cantidad total de votos para un candidato
		* @param candidato Candidato para el cual obtener los votos
		*/
  function getVotesByCandidate(bytes32 candidato) view public returns (uint8) {
    require(_candidatosValidos[candidato]);
    return _votosRecibidos[candidato];
  }

  /**
		* @dev Votación de un candidato
		* @dev La función detendrá su ejecución, en caso de una emergencia, gracias al modificador
		* @dev 'stopInEmergency', que es la implementación del patrón circuit-breaker
		* @param candidato Candidato por el cual votar
		* @param direccionVotador  Dirección del que realizará la votación
		* @param mensajeFirmado Mensaje firmado por el votador
		*/
  function vote(bytes32 candidato, address direccionVotador, bytes mensajeFirmado) stopInEmergency public {

		// Valida que el votador no haya votado!
		require(!_statusVotador[direccionVotador]);

		// Obtiene el hash guardado del candidato
    bytes32 voteHash = _hashCandidatos[candidato];

		// Recupera la cuenta del mensaje firmado
	  address recoveredAddress = voteHash.recover(mensajeFirmado);

		// La dirección del votador tiene que ser la misma que se usó para firmar el mensaje
    require(recoveredAddress == direccionVotador);

		// El caniddato tiene que ser válido
		require(_candidatosValidos[candidato]);

		// Aumenta la cantidad de votos para el candidato
    _votosRecibidos[candidato] += 1;

		// Marca al votador cómo que ya votó
    _statusVotador[direccionVotador] = true;
	}

	/**
		* @notice Introspection interface as per ERC-165 (https://github.com/ethereum/EIPs/issues/165).
		* @dev Returns true for any standardized interfaces implemented by this contract.
		* @param interfaceID bytes4 the interface to check for
		* @return true for any standardized interfaces implemented by this contract.
		*/
	function supportsInterface(bytes4 interfaceID) external view returns (bool) {
		return ((interfaceID == _InterfaceId_ERC165) || (interfaceID == _InterfaceId_ownable) || (interfaceID == _InterfaceId_pausable) || (interfaceID == _InterfaceId_destructible));
	}

}

